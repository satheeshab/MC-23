const mfconfig = {
    MF_APP1_URL: 'replaceActualApp1Url',
    MF_APP2_URL: 'replaceActualApp2Url',
    get GetApp1Url() {
        return this.MF_APP1_URL;
    },
    get GetApp2Url() {
        return this.MF_APP2_URL;
    }
}