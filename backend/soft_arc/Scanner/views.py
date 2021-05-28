from django.shortcuts import render
from .FileScanner import FileScanner
from .DisplayContent import DisplayContent
from django.core.files.storage import FileSystemStorage
from rest_framework.parsers import MultiPartParser, FormParser
import os
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.renderers import JSONRenderer
import json
from rest_framework import generics
from Scanner.models import SavedObjects
from .serializer import SavedObjectsSerializer, EditSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import authentication, permissions
from django.conf import settings
from io import BytesIO
from django.template.loader import get_template
from django.views import View
from django.http import HttpResponse
from xhtml2pdf import pisa
import socket


ALLOWED_EXTENSIONS = set(['java', 'cs', 'cpp'])
APP_ROOT = settings.MEDIA_URL

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class UploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser,FormParser] #Format of files

    def post(self,request,pk):
        folder='Files/'+str(pk)+'/'
        files = request.FILES.getlist('file')
        fs = FileSystemStorage(location=folder)

        for file in files:
            if file and allowed_file(file.name):
                filename= file.name
                fs.save(file.name, file)
        target = 'C:\\Users\\Rabi Siddique\\Desktop\\SoftArc\\backend\\soft_arc\\Files'+'\\'+str(pk)
            

        data = self.ScanFiles(target)
        ext = data[1]
        mylist = data[0][0]

        for l in mylist:
            if l[1] != []:
                tup = self.VariablesData(l[1],ext)
                l[1] = []
                l[1].append(tup[0])
                l[1].append(tup[1])
                l[1].append(tup[2])

        for l in mylist:
            if l[2] != []:
                tup2 = self.MethodsData(l[2],ext)
                l[2] = []
                l[2].append(tup2[0])
                l[2].append(tup2[1])
                l[2].append(tup2[2])
                l[2].append(tup2[3])


        
        dt = [mylist,ext]
        print(dt)
        return Response(dt,status=status.HTTP_200_OK)
    
            
    def ScanFiles(self,TargetFolder):
        files = self.get_Files(TargetFolder)
        ext = os.path.splitext(files[0])
        
        scanner = FileScanner()
        data = scanner.Project_Scanner(files)
        self.delete_Files(files)
        return (data,ext[1])
        #Display(data)
        


    def get_Files(self,f):
        filenames = os.listdir(f)
        files = [] 
        for filename in filenames:
            files.append(os.path.join(f, filename))
        return files

    def delete_Files(self,files):
        for f in files:
            os.remove(f)

    def Display(self,data):
        displayer = DisplayContent()
        
        if data[1] == '.java' or data[1] == '.cpp':
            extension = data[1]
            displayer.display_A(data[0])
            
            
        else:
            extension = '.cs'
            mylist=data[0]
            clist = data[2]
            l = data[3]
            interfaces = []
            for classes in clist:
        
                if 'Interface' in classes:
                    interfaces.append(classes.split(' ',1)[0])
            

            count = 0
            var = ''

                
            for e in l:
                if e != [] and e[0] not in interfaces:
                    var = e[0]
                    e.remove(e[0])
                    mylist[count][3] = var
                    mylist[count][4] = l[count]
                count = count + 1
            displayer.display_A(data[0])
        
        


    def VariablesData(self,vlist,extension):
        datatypelist = []
        modifierslist = []
        namelist = []
        modifiers = ['public','protected','private']
        datatype = ['String','int','float','boolean','void','double','long','short','char',
                            'byte','string','String[]','int[]','float[]','boolean[]','void',
                            'double[]','long[]','short[]','char[]','byte[]','string[]']
        
        

        for j in range(len(vlist)):
            if '=' in vlist[j]:
                index = vlist[j].index('=')
                vlist[j] = vlist[j][0:index].strip()

            l = list(vlist[j].split(' '))

            if len(l) == 2 and l[0] in datatype:
                if extension == '.java':
                    modifierslist.append('protected')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                else:
                    modifierslist.append('private')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                    

            elif len(l)>2:
                if l[0] in modifiers:
                    modifierslist.append(l[0])
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    

                else:
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    if extension == '.java':
                        modifierslist.append('protected')
                    else:
                        modifierslist.append('private')
                        
        return (modifierslist,datatypelist,namelist)




    def MethodsData(self,vlist,extension):
        datatypelist = []
        modifierslist = []
        argslist = []
        namelist = []
        modifiers = ['public','protected','private']
        datatype = ['String','int','float','boolean','void','double','long','short','char',
                            'byte','string','String[]','int[]','float[]','boolean[]','void',
                            'double[]','long[]','short[]','char[]','byte[]','string[]']
        
        

        for j in range(len(vlist)):
            if '=' in vlist[j]:
                index = vlist[j].index('=')
                vlist[j] = vlist[j][0:index].strip()

            lis = list(vlist[j].split('('))
            l = list(lis[0].split(' '))
            l2 = lis[1][0:-1]
            argslist.append(l2)

            

            if len(l) == 2 and l[0] in datatype:
                if extension == '.java':
                    modifierslist.append('protected')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                else:
                    modifierslist.append('private')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                    

            elif len(l)>2:
                if l[0] in modifiers:
                    modifierslist.append(l[0])
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    

                else:
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    if extension == '.java':
                        modifierslist.append('protected')
                    else:
                        modifierslist.append('private')
                        
        return (modifierslist,datatypelist,namelist,argslist)





    def MethodsData(self,mlist,extension):
        datatypelist = []
        modifierslist = []
        argslist = []
        namelist = []
        modifiers = ['public','protected','private']
        datatype = ['String','int','float','boolean','void','double','long','short','char','byte','string']
        
        for k in range(len(mlist)):
            lis = list(mlist[k].split('('))
            l = list(lis[0].split(' '))
            l2 = lis[1][0:-1]
            argslist.append(l2)

            if len(l) == 2 and l[0] in datatype:
                if extension == '.java':
                    modifierslist.append('protected')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                else:
                    modifierslist.append('private')
                    datatypelist.append(l[0])
                    namelist.append(l[1])
                    

            elif len(l)>2:
                if l[0] in modifiers:
                    modifierslist.append(l[0])
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    

                else:
                    datatypelist.append(l[-2])
                    namelist.append(l[-1])
                    if extension == '.java':
                        modifierslist.append('protected')
                    else:
                        modifierslist.append('private')
            
            
            
            
        return (modifierslist,datatypelist,namelist,argslist)


class UserDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request,format=None):
        serializer = SavedObjectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Data Saved"},status=status.HTTP_201_CREATED)

        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   

    def get(self, request, pk, format=None):
        data = SavedObjects.objects.filter(owner=pk)
        serializer = SavedObjectsSerializer(data,many=True)
        return Response(serializer.data)

    def patch(self, request, pk, format=None):
        update = SavedObjects.objects.get(pk=pk)
        serializer = EditSerializer(update,data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg':'Partial Data Updated'})
        return Response(serializer.errors)
    
    def delete(self,request,pk,format=None):
        item = SavedObjects.objects.get(pk=pk)
        item.delete()
        return Response({"msg":"Deleted Successfully"})




class PDFView(APIView):
    permission_classes = [permissions.AllowAny]

    def __init__(self):
        self.mylist= []

    def render_to_pdf(self,template_src, context_dict={}):
        template = get_template(template_src)
        html  = template.render(context_dict)
        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
        if not pdf.err:
            return HttpResponse(result.getvalue(), content_type='application/pdf')
        return None

    def post(self,request,format=None):
        print(request.data)
        data=request.data
        type = data['type']
        print(type)
        if type == 'tb':
            template = get_template('pdf1.html')
        if type == 'cd':
            print("Inside CD")
            template = get_template('pdf2.html')

        self.mylist = data['datareceived'][0]
        extension = data['datareceived'][1]
        context = {
            "mylist" : self.mylist,
            "extension": extension
        }
        
        html = template.render(context)
        if type == 'cd':
            pdf = self.render_to_pdf('pdf2.html', context)
        else:
            pdf = self.render_to_pdf('pdf1.html', context)
        if pdf:
            response = HttpResponse(pdf, content_type='application/pdf')
            filename = "DATA_%s.pdf" %("12341231")
            content = "inline; filename='%s'" %(filename)
            download = request.GET.get("download")
            if download:
                content = "attachment; filename='%s'" %(filename)
            response['Content-Disposition'] = content
            return response
        return HttpResponse("Not found")


     