#include<iostream>
# include <set >
int main () {
std :: set <int > s ;
for (int i =5; i >=1; i - -) // s: {50 ,40 ,30 ,20 ,10}
s . insert ( i *10);
s . insert (20); // no new element inserted
s . erase (20); // s: {50 ,40 ,30 ,10}
if( s . contains (40) )
std :: cout << "s has 40!\ n";
for ( int i : s ) // printing elements of a container
std :: cout << i << ’\n’;
return 0;
}
