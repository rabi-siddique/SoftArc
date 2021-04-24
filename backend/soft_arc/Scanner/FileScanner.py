# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 22:15:22 2020

@author: RabiSiddique
"""

from .ClassMembers import ClassMembers
from .ClassesAndRelations import ClassesAndRelations
import os

class FileScanner:
    
    def __init__(self):
        self.mylist = [] #Main List with all Data
        self.clist = [] #List with Class Names
        self.l = [] #List for C# purposes
        self.extension = ''
       
    

    def Project_Scanner(self,files):
        c = ClassMembers()
        d = ClassesAndRelations()
        mylist = []
        clist = []
        interfaces = []
        l = []
        vlist = []
        linelist = []
        vlist1 = []
    
        for file in files:
            f =  open(file,'r')
            
   
            all_lines = f.readlines()
            file_extension = os.path.splitext(file)
   
    
            if file_extension[1] == '.java':
                for line in all_lines:
                    classTuple = d.is_JavaClass(line)
                    if classTuple[0] == True:
                        self.extension = file_extension[1]
                        break
            
            elif file_extension[1] == '.cs':
                for line in all_lines:
                    classTuple = d.is_CSharpClass(line)
                    if classTuple[0] == True:
                        self.clist.append(classTuple[1])
                        self.extension = file_extension[1]
                        break
            elif file_extension[1] == '.cpp':
                for line in all_lines:
                    classTuple = d.is__CPlusClass(line)
                    if classTuple[0] == True:
                        self.extension = file_extension[1]
                        break
                    
                    
                    
            
            #vlist = [c.formatter(lines) for lines in all_lines if c.isVariable(lines)]
            vlist = self.GetVariables(all_lines)
            mlist = [c.formatter(lines) for lines in all_lines if c.isMethod(lines,classTuple[1])]
            
            
            if file_extension[1] == '.cpp':
                tup = self.RefinedClassMembersCPP(all_lines, vlist, mlist,classTuple[1])
                self.mylist.append([tup[2],tup[0],tup[1],classTuple[2],classTuple[3]])
            else:
                self.mylist.append([classTuple[1],vlist,mlist,classTuple[2],classTuple[3]])
    
            if file_extension[1] == '.cs':
                self.l.append(classTuple[3])
                
            
                
        
        if self.l == []:
            return (self.mylist,self.extension)  
        else:
            if len(mylist)>1:
                lis = self.RefinedRelationsCS(self.mylist,self.clist,self.l)
                self.mylist = []
                self.mylist = lis
                return(self.mylist,self.extension)
            else:
                 return(self.mylist,self.extension)
                
        
        
        
        
    def RefinedClassMembersCPP(self,allines,vlist,mlist,className):
        size = len(allines)
        b = [[],[]]
        for i in range(size):
            if 'public:' in allines[i] or 'public :' in allines[i]:
                b[0].append(i)
                b[1].append('public ')
            elif 'private:' in allines[i] or 'private :' in allines[i]:
                b[0].append(i)
                b[1].append('private ')
            elif 'protected:' in allines[i] or 'protected :' in allines[i]:
                b[0].append(i)
                b[1].append('protected ')
                
        if b != [[],[]]:
            x = []
            y = []
            a = ClassMembers()
            for i in range(len(b[0])):
                if i != (len(b[0])-1):
                    for j in range(b[0][i],b[0][i+1]):
                        if a.isVariable(allines[j]):
                            x.append(self.formatter(b[1][i]+allines[j]))
                        elif a.isMethod(allines[j],className):
                            if 'virtual' in allines[j]:
                                if '=' in allines[j]:
                                    index = allines[j].index('=')
                                    allines[j] = allines[j][0:index].strip()
                                y.append(self.formatter(b[1][i]+allines[j]))
                                className = className+"(Abstract Class)"
                            else:
                                y.append(self.formatter(b[1][i]+allines[j]))
        
                else:
                    for j in range(b[0][i],len(allines)):
                        if a.isVariable(allines[j]):
                            x.append(self.formatter(b[1][i]+allines[j]))
                        elif a.isMethod(allines[j],className):
                            if 'virtual' in allines[j]:
                                if '=' in allines[j]:
                                    index = allines[j].index('=')
                                    allines[j] = allines[j][0:index].strip()
                                y.append(self.formatter(b[1][i]+allines[j]))
                                className = className+"Abstract Class"
                            else:
                                y.append(self.formatter(b[1][i]+allines[j]))
                      
            sizeA = len(x)
            sizeB = len(vlist)
            size = sizeB - sizeA
            
            for i in range(size):
                x.insert(i,'private '+vlist[i])
                
            sizeA = len(y)
            sizeB = len(mlist)
            size = sizeB - sizeA
            
            for i in range(size):
                y.insert(i,'private '+mlist[i])
        
            return (x,y,className)
        
        
        
        
        
    def RefinedRelationsCS(self,mylist,clist,l):
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
    
        
        return mylist
    
    
    def GetVariables(self,allines):
        
        vlist = []
        l = []
        l2 = []
        l3 = []
        a = ClassMembers()
        
        
        
        
        
        for lines in allines:
            if lines.count(';')>1:
                strr = lines
                l = list(strr.split(';'))
                l = [x+';' for x in l]
                l = [a.formatter(x) for x in l if a.isVariable(x)]
                
                
            elif lines.count(';') == 1:
                if a.isVariable(lines):
                    l2.append(a.formatter(lines))
                    
        
        
        print(l)
        print(l2)            
        
        if l == []  :
            vlist = l2
            return vlist
        else:
            vlist = l2 + l
            return vlist
        
        
                
                
                
            


        
        
        
        
    def formatter(self,line):
        
        line = line.strip()
        try:
            if '//' in line:
                index = line.index("/")
                newline = line[0:index]
                newline = newline.strip()
                if newline[-1] in ['{','}',';']:
                    newline2 = newline[0:-1]
                    newline2 = newline2.strip()
                    return newline2
            elif line[-1] in ['{','}',';']:
                    newline = line[0:-1]
                    newline = newline.strip()
                    return newline
            else:
                return line
        except IndexError:
            return line
       
        
        

    