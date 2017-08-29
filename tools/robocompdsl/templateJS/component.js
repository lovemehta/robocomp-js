/*
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
 *    Copyright (C)
[[[cog
A()
import datetime
cog.out(' ' + str(datetime.date.today().year))
Z()
]]]
[[[end]]]
 by YOUR NAME HERE
 *
 *    This file is part of RoboComp
 *
 *    RoboComp is free software: you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation, either version 3 of the License, or
 *    (at your option) any later version.
 *
 *    RoboComp is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with RoboComp.  If not, see <http://www.gnu.org/licenses/>.
 */


var http = require('http');
var fs = require('fs');    
var opn = require('opn');
var Ice = require("ice").Ice;

[[[cog
    for namea, num in getNameNumber(component['requires']):
        if type(namea) == str:
            name = namea
        else:
            name = namea[0]
        if communicationIsIce(namea):
            cog.outl("var RoboComp"+name+"= require(\"./"+name+"\").RoboComp"+name+";")

]]]
[[[end]]]

var server = http.createServer(function(req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayUI(res);
    } else if (req.method.toLowerCase() == 'post') {
        processRequest(req, res);
    }
});

function displayUI(res) {
    fs.readFile('UI.html', function(err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
 }

function processRequest(req, res) {
     //function to process a post request
     }
 
 var ic;
 
 Ice.Promise.try(
function() {
    
    ic = Ice.initialize();
    var base = ic.stringToProxy("");
[[[cog
    for namea, num in getNameNumber(component['requires']):
        portNumber=1185
        if type(namea) == str:
            name = namea
        else:
            name = namea[0]
        if communicationIsIce(namea):
            cog.outl("var "+name.lower()+"_proxy = RoboComp"+name+"."+name+"Prx.checkedCast(base);\n return "+name.lower()+"_proxy.then(\n" +
                '<TABHERE>'+"function("+name.lower()+") {\n"+
                '<TABHERE>'+"//add specific functionality here\n"+
                '<TABHERE>'+"console.log('Promise Accepted');\n"+
                '<TABHERE>'+"console.log('Connection successful to' + "+name.lower()+");\n")
            cog.outl( "server.listen(%d);" % portNumber)
            cog.outl("console.log('server listening on %d');" % portNumber)
            cog.outl("opn('http://127.0.0.1:%d');\n" %portNumber)
            cog.outl("});\n }).finally(\nfunction() {\n    if (ic) {\n    console.log('Promise completed.');\n        return ic.destroy();\n    }\n}).catch(\nfunction(ex) {\n    console.log('Promise Rejected');\n    console.log(ex.toString());\n    process.exit(1);\n});)")
        portNumber= portNumber+1;

]]]
[[[end]]]


