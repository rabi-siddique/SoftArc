# -*- coding: utf-8 -*-
"""
Created on Thu Jul  9 10:20:10 2020

@author: RabiSiddique
"""





class DisplayContent:
    
    
    def display_A(self,mylist):
        
      
        for elements in mylist:
            print(elements[0])
            print(elements[1::])
            print()
         
       
            
    def display_B(self,mylist,clist,l):
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
            
        for elements in mylist:
            print(elements[0])
            print(elements[1::])
            print()
     
    





    