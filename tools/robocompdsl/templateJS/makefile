[[[cog

import sys
sys.path.append('/opt/robocomp/python')

import cog
def A():
    cog.out('<@@<')
def Z():
    cog.out('>@@>')
def TAB():
    cog.out('<TABHERE>')

from parseCDSL import *
includeDirectories = theIDSLPaths.split('#')
component = CDSLParsing.fromFile(theCDSL, includeDirectories=includeDirectories)
]]]
[[[end]]]

[[[cog
	for namea, num in getNameNumber(component['requires']):
		if type(namea) == str:
			name = namea
		else:
			name = namea[0]
		if communicationIsIce(namea):
			cog.outl(name+".js: ${ROBOCOMP}/interfaces/IDSLs/"+name+".idsl")
			cog.outl('<TABHERE>'+"slice2js ${ROBOCOMP}/interfaces/"+name+".ice")
			cog.outl('<TABHERE>'+"npm install ice")
			cog.outl('<TABHERE>'+"npm install opn")
			cog.outl('<TABHERE>'+"npm install fs")

]]]
[[[end]]]
