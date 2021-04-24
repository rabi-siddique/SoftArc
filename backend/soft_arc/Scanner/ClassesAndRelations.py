# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 10:18:07 2020

@author: RabiSiddique
"""

class ClassesAndRelations:
    
    def is_JavaClass(self,line):
        line = self.formatter(line)
        linelist = list(line.split(' '))
        index = 0
        class_name = ''
        parent_name = ''
        ilist = []
    
    
        try:
            has_classKeyword = 'class' in line or 'interface' in line
        except IndexError:
            return False
        
    
    
        for element in linelist:
        
            if 'class' == element:
                class_name = linelist[int(index)+1]
         
            elif 'interface' == element:
                class_name = linelist[int(index)+1]+'(Interface)'
     
            elif 'extends' == element:
                parent_name = linelist[int(index)+1]
            
            elif 'implements' == element:
                for x in linelist[int(index)+1:len(linelist)]:
                
                    x = x.split(',')
                    for e in x:
                        if not e == '':
                            ilist.append(e)
            
            index = index + 1
       
        
        return (has_classKeyword,class_name,parent_name,ilist)
    
    
    
    def is_CSharpClass(self,line):
        line = self.formatter(line)
        linelist = list(line.split(' '))
        class_name = ''
        index1 = 0
        index2 = 0
    
    
        try:
            has_classKeyword = 'class' in line or 'interface' in line
        except IndexError:
            return False

        if has_classKeyword and ':' in line:
            linelist = list(line.split(':'))
            l1 = list(linelist[0].split())
            l2 = list(linelist[1].split(','))
            l2 = [x.strip() for x in l2]
        
            for element in l1:
            
                if 'class' == element:
                    class_name = l1[int(index1)+1]
                index1 = index1 + 1
                    
            return (has_classKeyword,class_name,'',l2)
        
            
        elif has_classKeyword and not':' in line:
            linelist = list(line.split())
        
            for element in linelist:
            
                if 'class' == element:
                    class_name = linelist[int(index2)+1]
                elif 'interface' == element:
                    class_name = linelist[int(index2)+1]+' Interface'
        
                index2 = index2 + 1
        
            return (has_classKeyword,class_name,'',[]) 
        else:
            return (False,'','',[])
        
    


    def is__CPlusClass(self,line):
        line = self.formatter(line)
        linelist = list(line.split(' '))
        class_name = ''
        index1 = 0
        index2 = 0
    
    
        try:
            has_classKeyword = 'class' in line or 'interface' in line
        except IndexError:
            return False

        if has_classKeyword and ':' in line:
            linelist = list(line.split(':',1))
            l1 = list(linelist[0].split())
            l2 = list(linelist[1].replace('public','').split(':'))
            l2 = [x.strip() for x in l2]
        
            for element in l1:
            
                if 'class' == element:
                    class_name = l1[int(index1)+1]
                index1 = index1 + 1
        
            return (has_classKeyword,class_name,'',l2)
        
        
        elif has_classKeyword and not':' in line:
            linelist = list(line.split())
            
            for element in linelist:
            
                if 'class' == element:
                    class_name = linelist[int(index2)+1]
                elif 'interface' == element:
                    class_name = linelist[int(index2)+1]+' Interface'
        
                index2 = index2 + 1
        
            return (has_classKeyword,class_name,'',[]) 
        
        else:
            return (False,'','',[])

   

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
        
