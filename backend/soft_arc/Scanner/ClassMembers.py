# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 10:16:01 2020

@author: RabiSiddique
"""


class ClassMembers:
    
    def __init__(self):
        self.properties = ['private','protected','public','static','final']
        self.datatype = ['String','int','float','boolean','void','double','long','short','char',
                         'byte','string','String[]','int[]','float[]','boolean[]','void',
                         'double[]','long[]','short[]','char[]','byte[]','string[]']
        


    def isVariable(self,line):
    
        if ';' in line and '(' not in line and ')' not in line:
            linelist = list(line.split())
    
            try:
                has_property = linelist[0] in self.properties
            except IndexError:
                return False

            try:
                has_datatype = (linelist[0] in self.datatype or linelist[1] in self.datatype or linelist[2] in self.datatype
                                or linelist[3] in self.datatype)
            except IndexError:
                return False
    
            if has_property:
                 return has_datatype
            else:
                return has_datatype
        else:
            return False

    
    def isMethod(self,line,className):
    
        if ';' not in line or '(' in line and ')' in line:
            linelist = list(line.split())
    
            try:
                has_property = linelist[0] in self.properties
            except IndexError:
                return False

            try:
                has_datatype = (linelist[0] in self.datatype or linelist[1] in self.datatype or linelist[2] in self.datatype
                                or linelist[3] in self.datatype)
            except IndexError:
                return False
    
            if className in linelist[1]:
                return False
            elif has_property:
                return has_datatype
            else:
                return has_datatype
            
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
       
        
        