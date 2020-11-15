import os
import sys

def new_module(name):
    print(name + '?')
    inp = input()
    if inp != 'class' and inp != 'func':
        return
    Name = ''.join([n[0].upper() + n[1:] for n in name.split('-')])
    with open('index.ts', mode='w') as f:
        f.write("import {} from './{}'\n".format(Name, name))
        f.write('export default {}\n'.format(Name))
    with open('{}.tsx'.format(name), mode='w') as f:
        f.write("import React from 'react';\n\n")
        f.write("import styles from './{}.module.css';\n\n".format(name))
        if inp == 'class':
            f.write('interface I{}State {{}};\n\n'.format(Name))
            f.write('interface I{}Props {{}};\n\n'.format(Name))
            f.write('export default class {} extends React.Component {{\n\n'.format(Name))
            f.write('\tpublic readonly props: I{}Props\n'.format(Name))
            f.write('\tpublic state: I{}State\n\n'.format(Name))
            f.write('\tconstructor(props: I{}Props) {{\n'.format(Name))
            f.write('\t\tsuper(props)\n\t\tthis.props = props;\n\t\tthis.state = {};\n\t}\n\n')
            f.write('\trender() {\n\t\treturn <div></div>;\n\t}\n')
            f.write('}\n')
        elif inp == 'func':
            f.write('function {}() {{\n\treturn <div></div>;\n}}\n\n'.format(Name))
            f.write('export default {};\n'.format(Name))
    with open('{}.module.css'.format(name), mode='w') as f:
        f.write('.{} {{\n\t\n}}\n'.format(name))


os.chdir('src')
name = sys.argv[1] + '/'
while name != '':
    ind = name.find('/')
    dirname = name[:ind]
    if os.path.isfile(dirname):
        raise Exception(dirname + ' is already a file')
    elif not os.path.isdir(dirname):
        os.mkdir(dirname)
        os.chdir(dirname)
        new_module(dirname)
        os.chdir('..')
    os.chdir(dirname)
    name = name[ind+1:]
