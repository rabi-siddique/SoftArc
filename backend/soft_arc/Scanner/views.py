from django.shortcuts import render
from .FileScanner import FileScanner
from .DisplayContent import DisplayContent
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse,HttpRequest
from rest_framework.views import APIView
from rest_framework import authentication, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
import os
from rest_framework.decorators import api_view, parser_classes



ALLOWED_EXTENSIONS = set(['java', 'cs', 'cpp'])
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@csrf_exempt
def upload(request, format=None):
    if request.method == 'POST':

        files = request.FILES.getlist('file')
        fs = FileSystemStorage()

        for file in files:
            if file and allowed_file(file.name):
                filename= file.name
                fs.save(file.name, file)
        target = os.path.join(APP_ROOT,'media/')
            

        data = ScanFiles(target)
        ext = data[1]
        mylist = data[0][0]

        for l in mylist:
            if l[1] != []:
                tup = VariablesData(l[1],ext)
                l[1] = []
                l[1].append(tup[0])
                l[1].append(tup[1])
                l[1].append(tup[2])

        for l in mylist:
            if l[2] != []:
                tup2 = MethodsData(l[2],ext)
                l[2] = []
                l[2].append(tup2[0])
                l[2].append(tup2[1])
                l[2].append(tup2[2])
                l[2].append(tup2[3])


#        for l in mylist:
#           print('Mlist:')
#          print(l[2])

        print(mylist)
        return Response(mylist,status=status.HTTP_200_OK)
    
        
def ScanFiles(TargetFolder):
    files = get_Files(TargetFolder)
    ext = os.path.splitext(files[0])
    
    scanner = FileScanner()
    data = scanner.Project_Scanner(files)
    delete_Files(files)
    return (data,ext[1])
    #Display(data)
    


def get_Files(f):
    filenames = os.listdir(f)
    files = [] 
    for filename in filenames:
        files.append(os.path.join(f, filename))
    return files

def delete_Files(files):
    for f in files:
        os.remove(f)

def Display(data):
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
    
    


def VariablesData(vlist,extension):
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




def MethodsData(vlist,extension):
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





def MethodsData(mlist,extension):
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

    