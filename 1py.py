import textwrap

def wrap(string, max_width):
    a=""
    for i in range(int(len(string)/max_width)):
        if 4*i+4<len(string):
            a=a+string[4*i:4*(i+1)]+"\n"
        else:
            a=a+string[4*i:len(string)]
    
    return a

if __name__ == '__main__':
    string, max_width = input(), int(input())
    result = wrap(string, max_width)
    print(result)