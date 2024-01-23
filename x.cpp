#include <iostream>
#include <vector>

using namespace std;

void magicIndex(vector<int>& a, int n) {
    int k = 0;
    for (int i = 0; i < n; i++) {
        if (a[i] == i) {
            cout << i << " ";
            k++;
        }
    }
    if (k == 0) {
        cout << "-1";
    }
    cout << "\n";
}

int main() {
    int T;
    cin >> T;
    while (T--) {
        int n;
        cin >> n;
        vector<int> a(n);
        for (int i = 0; i < n; i++) {
            cin >> a[i];
        }
        magicIndex(a, n);
    }
    return 0;
}