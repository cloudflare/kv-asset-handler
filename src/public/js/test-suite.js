var testSuite = (function (exports) {
    'use strict';

    const t=new Uint8Array([0,97,115,109,1,0,0,0,1,48,8,96,3,127,127,127,0,96,3,127,127,127,1,127,96,2,127,127,0,96,2,127,126,0,96,1,127,1,127,96,1,127,1,126,96,3,127,127,126,1,126,96,3,126,127,127,1,126,3,11,10,1,1,2,0,4,6,7,3,0,5,5,3,1,0,1,7,85,9,3,109,101,109,2,0,5,120,120,104,51,50,0,0,6,105,110,105,116,51,50,0,2,8,117,112,100,97,116,101,51,50,0,3,8,100,105,103,101,115,116,51,50,0,4,5,120,120,104,54,52,0,5,6,105,110,105,116,54,52,0,7,8,117,112,100,97,116,101,54,52,0,8,8,100,105,103,101,115,116,54,52,0,9,10,211,23,10,242,1,1,4,127,32,0,32,1,106,33,3,32,1,65,16,79,4,127,32,3,65,16,107,33,6,32,2,65,168,136,141,161,2,106,33,3,32,2,65,247,148,175,175,120,106,33,4,32,2,65,177,243,221,241,121,107,33,5,3,64,32,0,40,2,0,65,247,148,175,175,120,108,32,3,106,65,13,119,65,177,243,221,241,121,108,33,3,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,32,4,106,65,13,119,65,177,243,221,241,121,108,33,4,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,32,2,106,65,13,119,65,177,243,221,241,121,108,33,2,32,0,65,4,106,34,0,40,2,0,65,247,148,175,175,120,108,32,5,106,65,13,119,65,177,243,221,241,121,108,33,5,32,0,65,4,106,34,0,32,6,77,13,0,11,32,2,65,12,119,32,5,65,18,119,106,32,4,65,7,119,106,32,3,65,1,119,106,5,32,2,65,177,207,217,178,1,106,11,32,1,106,32,0,32,1,65,15,113,16,1,11,146,1,0,32,1,32,2,106,33,2,3,64,32,1,65,4,106,32,2,75,69,4,64,32,1,40,2,0,65,189,220,202,149,124,108,32,0,106,65,17,119,65,175,214,211,190,2,108,33,0,32,1,65,4,106,33,1,12,1,11,11,3,64,32,1,32,2,79,69,4,64,32,1,45,0,0,65,177,207,217,178,1,108,32,0,106,65,11,119,65,177,243,221,241,121,108,33,0,32,1,65,1,106,33,1,12,1,11,11,32,0,65,15,118,32,0,115,65,247,148,175,175,120,108,34,0,32,0,65,13,118,115,65,189,220,202,149,124,108,34,0,32,0,65,16,118,115,11,63,0,32,0,65,8,106,32,1,65,168,136,141,161,2,106,54,2,0,32,0,65,12,106,32,1,65,247,148,175,175,120,106,54,2,0,32,0,65,16,106,32,1,54,2,0,32,0,65,20,106,32,1,65,177,243,221,241,121,107,54,2,0,11,211,4,1,6,127,32,1,32,2,106,33,6,32,0,65,24,106,33,5,32,0,65,40,106,40,2,0,33,3,32,0,32,0,40,2,0,32,2,106,54,2,0,32,0,65,4,106,34,4,32,4,40,2,0,32,2,65,16,79,32,0,40,2,0,65,16,79,114,114,54,2,0,32,2,32,3,106,65,16,73,4,64,32,3,32,5,106,32,1,32,2,252,10,0,0,32,0,65,40,106,32,2,32,3,106,54,2,0,15,11,32,3,4,64,32,3,32,5,106,32,1,65,16,32,3,107,34,2,252,10,0,0,32,0,65,8,106,34,3,40,2,0,32,5,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,4,32,3,32,4,54,2,0,32,0,65,12,106,34,3,40,2,0,32,5,65,4,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,4,32,3,32,4,54,2,0,32,0,65,16,106,34,3,40,2,0,32,5,65,8,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,4,32,3,32,4,54,2,0,32,0,65,20,106,34,3,40,2,0,32,5,65,12,106,40,2,0,65,247,148,175,175,120,108,106,65,13,119,65,177,243,221,241,121,108,33,4,32,3,32,4,54,2,0,32,0,65,40,106,65,0,54,2,0,32,1,32,2,106,33,1,11,32,1,32,6,65,16,107,77,4,64,32,6,65,16,107,33,8,32,0,65,8,106,40,2,0,33,2,32,0,65,12,106,40,2,0,33,3,32,0,65,16,106,40,2,0,33,4,32,0,65,20,106,40,2,0,33,7,3,64,32,1,40,2,0,65,247,148,175,175,120,108,32,2,106,65,13,119,65,177,243,221,241,121,108,33,2,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,32,3,106,65,13,119,65,177,243,221,241,121,108,33,3,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,32,4,106,65,13,119,65,177,243,221,241,121,108,33,4,32,1,65,4,106,34,1,40,2,0,65,247,148,175,175,120,108,32,7,106,65,13,119,65,177,243,221,241,121,108,33,7,32,1,65,4,106,34,1,32,8,77,13,0,11,32,0,65,8,106,32,2,54,2,0,32,0,65,12,106,32,3,54,2,0,32,0,65,16,106,32,4,54,2,0,32,0,65,20,106,32,7,54,2,0,11,32,1,32,6,73,4,64,32,5,32,1,32,6,32,1,107,34,1,252,10,0,0,32,0,65,40,106,32,1,54,2,0,11,11,97,1,1,127,32,0,65,16,106,40,2,0,33,1,32,0,65,4,106,40,2,0,4,127,32,1,65,12,119,32,0,65,20,106,40,2,0,65,18,119,106,32,0,65,12,106,40,2,0,65,7,119,106,32,0,65,8,106,40,2,0,65,1,119,106,5,32,1,65,177,207,217,178,1,106,11,32,0,40,2,0,106,32,0,65,24,106,32,0,65,40,106,40,2,0,16,1,11,157,4,2,1,127,3,126,32,0,32,1,106,33,3,32,1,65,32,79,4,126,32,3,65,32,107,33,3,32,2,66,135,149,175,175,152,182,222,155,158,127,124,66,207,214,211,190,210,199,171,217,66,124,33,4,32,2,66,207,214,211,190,210,199,171,217,66,124,33,5,32,2,66,0,124,33,6,32,2,66,135,149,175,175,152,182,222,155,158,127,125,33,2,3,64,32,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,4,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,4,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,5,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,5,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,6,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,0,65,8,106,34,0,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,2,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,2,32,0,65,8,106,34,0,32,3,77,13,0,11,32,6,66,12,137,32,2,66,18,137,124,32,5,66,7,137,124,32,4,66,1,137,124,32,4,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,5,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,6,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,2,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,5,32,2,66,197,207,217,178,241,229,186,234,39,124,11,32,1,173,124,32,0,32,1,65,31,113,16,6,11,137,2,0,32,1,32,2,106,33,2,3,64,32,1,65,8,106,32,2,77,4,64,32,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,32,0,133,66,27,137,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,33,0,32,1,65,8,106,33,1,12,1,11,11,32,1,65,4,106,32,2,77,4,64,32,1,53,2,0,66,135,149,175,175,152,182,222,155,158,127,126,32,0,133,66,23,137,66,207,214,211,190,210,199,171,217,66,126,66,249,243,221,241,153,246,153,171,22,124,33,0,32,1,65,4,106,33,1,11,3,64,32,1,32,2,73,4,64,32,1,49,0,0,66,197,207,217,178,241,229,186,234,39,126,32,0,133,66,11,137,66,135,149,175,175,152,182,222,155,158,127,126,33,0,32,1,65,1,106,33,1,12,1,11,11,32,0,66,33,136,32,0,133,66,207,214,211,190,210,199,171,217,66,126,34,0,32,0,66,29,136,133,66,249,243,221,241,153,246,153,171,22,126,34,0,32,0,66,32,136,133,11,88,0,32,0,65,8,106,32,1,66,135,149,175,175,152,182,222,155,158,127,124,66,207,214,211,190,210,199,171,217,66,124,55,3,0,32,0,65,16,106,32,1,66,207,214,211,190,210,199,171,217,66,124,55,3,0,32,0,65,24,106,32,1,55,3,0,32,0,65,32,106,32,1,66,135,149,175,175,152,182,222,155,158,127,125,55,3,0,11,132,5,2,3,127,4,126,32,1,32,2,106,33,5,32,0,65,40,106,33,4,32,0,65,200,0,106,40,2,0,33,3,32,0,32,0,41,3,0,32,2,173,124,55,3,0,32,2,32,3,106,65,32,73,4,64,32,3,32,4,106,32,1,32,2,252,10,0,0,32,0,65,200,0,106,32,2,32,3,106,54,2,0,15,11,32,3,4,64,32,3,32,4,106,32,1,65,32,32,3,107,34,2,252,10,0,0,32,0,65,8,106,34,3,41,3,0,32,4,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,3,32,6,55,3,0,32,0,65,16,106,34,3,41,3,0,32,4,65,8,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,3,32,6,55,3,0,32,0,65,24,106,34,3,41,3,0,32,4,65,16,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,3,32,6,55,3,0,32,0,65,32,106,34,3,41,3,0,32,4,65,24,106,41,3,0,66,207,214,211,190,210,199,171,217,66,126,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,3,32,6,55,3,0,32,0,65,200,0,106,65,0,54,2,0,32,1,32,2,106,33,1,11,32,1,65,32,106,32,5,77,4,64,32,5,65,32,107,33,2,32,0,65,8,106,41,3,0,33,6,32,0,65,16,106,41,3,0,33,7,32,0,65,24,106,41,3,0,33,8,32,0,65,32,106,41,3,0,33,9,3,64,32,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,6,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,6,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,7,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,7,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,8,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,8,32,1,65,8,106,34,1,41,3,0,66,207,214,211,190,210,199,171,217,66,126,32,9,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,33,9,32,1,65,8,106,34,1,32,2,77,13,0,11,32,0,65,8,106,32,6,55,3,0,32,0,65,16,106,32,7,55,3,0,32,0,65,24,106,32,8,55,3,0,32,0,65,32,106,32,9,55,3,0,11,32,1,32,5,73,4,64,32,4,32,1,32,5,32,1,107,34,1,252,10,0,0,32,0,65,200,0,106,32,1,54,2,0,11,11,200,2,1,5,126,32,0,65,24,106,41,3,0,33,1,32,0,41,3,0,34,2,66,32,90,4,126,32,0,65,8,106,41,3,0,34,3,66,1,137,32,0,65,16,106,41,3,0,34,4,66,7,137,124,32,1,66,12,137,32,0,65,32,106,41,3,0,34,5,66,18,137,124,124,32,3,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,4,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,1,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,32,5,66,207,214,211,190,210,199,171,217,66,126,66,0,124,66,31,137,66,135,149,175,175,152,182,222,155,158,127,126,133,66,135,149,175,175,152,182,222,155,158,127,126,66,227,220,202,149,252,206,242,245,133,127,124,5,32,1,66,197,207,217,178,241,229,186,234,39,124,11,32,2,124,32,0,65,40,106,32,2,66,31,131,167,16,6,11]);async function e(){const{instance:{exports:{mem:e,xxh32:n,xxh64:r,init32:i,update32:o,digest32:h,init64:s,update64:u,digest64:g}}}=await WebAssembly.instantiate(t);let a=new Uint8Array(e.buffer);function c(t,n){if(e.buffer.byteLength<t+n){const r=Math.ceil((t+n-e.buffer.byteLength)/65536);e.grow(r),a=new Uint8Array(e.buffer);}}function l(t,e,n,r,i,o){c(t);const h=new Uint8Array(t);return a.set(h),n(0,e),h.set(a.slice(0,t)),{update(e){let n;return a.set(h),"string"==typeof e?(c(3*e.length,t),n=b.encodeInto(e,a.subarray(t)).written):(c(e.byteLength,t),a.set(e,t),n=e.byteLength),r(0,t,n),h.set(a.slice(0,t)),this},digest:()=>(a.set(h),o(i(0)))}}function d(t){return t>>>0}const f=2n**64n-1n;function y(t){return t&f}const b=new TextEncoder,w=0n;function p(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return c(3*t.length,0),d(n(0,b.encodeInto(t,a).written,e))}function v(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w;return c(3*t.length,0),y(r(0,b.encodeInto(t,a).written,e))}return {h32:p,h32ToString(t){return p(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:0).toString(16).padStart(8,"0")},h32Raw(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return c(t.byteLength,0),a.set(t),d(n(0,t.byteLength,e))},create32(){return l(48,arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,i,o,h,d)},h64:v,h64ToString(t){return v(t,arguments.length>1&&void 0!==arguments[1]?arguments[1]:w).toString(16).padStart(16,"0")},h64Raw(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:w;return c(t.byteLength,0),a.set(t),y(r(0,t.byteLength,e))},create64(){return l(88,arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,s,u,g,y)}}}

    const base64FromBlob = async (data) => {
        const base64url = await new Promise((r) => {
            const reader = new FileReader();
            reader.onload = () => r(reader.result);
            reader.readAsDataURL(data);
        });
        return String(base64url).split(',', 2)[1];
    };
    const getCFStyleXXHash = async (rawContent) => {
        const { h64ToString, h64Raw } = await e();
        let hash;
        // An empty file will not work with base64FromBlob
        if (rawContent.size === 0) {
            const arrBuffer = await new Response(rawContent).arrayBuffer();
            const hash64 = h64Raw(new Uint8Array(arrBuffer));
            hash = hash64.toString(16).padStart(16, '0');
            //TODO test
        }
        else {
            const base64Data = await base64FromBlob(rawContent);
            hash = h64ToString(base64Data);
        }
        // Wrangler removes the leading 0 from the hash (need to work out why/where)
        let hashSubStr = hash.replace(/^0+/, '').substring(0, 10);
        return hashSubStr;
    };

    const runTests$4 = async function () {
        const testResults = [];
        // Test #1
        const defaultDocumentResult = {
            description: 'getAssetFromKV return correct val from KV and default caching',
            testFacets: [],
        };
        const defaultPageTest = await fetch('/', { method: 'GET' });
        if (defaultPageTest.ok) {
            const contentHash = await getCFStyleXXHash(await defaultPageTest.blob());
            if (contentHash === '482060b178') {
                defaultDocumentResult.testFacets.push({ description: 'index.html served', result: true });
            }
            else {
                defaultDocumentResult.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            defaultDocumentResult.testFacets.push({ description: 'index.html not served', result: false });
        }
        testResults.push(defaultDocumentResult);
        // Test #2
        const extenstionlessWithSlashResponse = await fetch('test-files/client/', { method: 'GET' });
        const extensionlessWithSlashResult = {
            description: 'getAssetFromKV evaluated the file matching the extensionless path first /client/ -> client',
            testFacets: [],
        };
        if (extenstionlessWithSlashResponse.ok) {
            const contentHash = await getCFStyleXXHash(await extenstionlessWithSlashResponse.blob());
            if (contentHash === 'e24b5b69a5') {
                extensionlessWithSlashResult.testFacets.push({
                    description: '/client/index.html served',
                    result: true,
                });
            }
            else {
                extensionlessWithSlashResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
        }
        else {
            extensionlessWithSlashResult.testFacets.push({
                description: '/client/index.html not served',
                result: false,
            });
        }
        testResults.push(extensionlessWithSlashResult);
        // Test #3
        const extensionLessResponse = await fetch('test-files/client', { method: 'GET' });
        const extensionlessResult = {
            description: 'getAssetFromKV evaluated the file matching the extensionless path first /client -> client',
            testFacets: [],
        };
        if (extensionLessResponse.ok) {
            const contentHash = await getCFStyleXXHash(await extensionLessResponse.blob());
            if (contentHash === 'e24b5b69a5') {
                extensionlessResult.testFacets.push({
                    description: '/client/index.html served',
                    result: true,
                });
            }
            else {
                extensionlessResult.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            extensionlessResult.testFacets.push({
                description: '/client/index.html not served',
                result: false,
            });
        }
        testResults.push(extensionlessResult);
        // MapRequestToAsset Test #4
        const customDefaultDocumentResponse = await fetch('test-files/client', {
            method: 'GET',
            headers: { 'x-cf-test-custom-default': 'true' },
        });
        const customDefaultDocumentResult = {
            description: 'mapRequestToAsset() correctly changes /test-files/client -> /test-files/client/default.html',
            testFacets: [],
        };
        if (customDefaultDocumentResponse.ok) {
            const contentHash = await getCFStyleXXHash(await customDefaultDocumentResponse.blob());
            if (contentHash === '797d07d691') {
                customDefaultDocumentResult.testFacets.push({
                    description: '/test-files/client/default.html served',
                    result: true,
                });
            }
            else {
                customDefaultDocumentResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
        }
        else {
            customDefaultDocumentResult.testFacets.push({
                description: '/test-files/client/default.html not served',
                result: false,
            });
        }
        testResults.push(customDefaultDocumentResult);
        // Test #4
        const notInManifestResponse = await fetch('/no-hash.txt', { method: 'GET' });
        const notInManifestResult = {
            description: 'getAssetFromKV if not in asset manifest still returns nohash.txt',
            testFacets: [],
        };
        if (notInManifestResponse.ok) {
            const content = await notInManifestResponse.text();
            if (content === 'test not in manifest') {
                notInManifestResult.testFacets.push({ description: 'correct file served', result: true });
            }
            else {
                notInManifestResult.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            notInManifestResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(notInManifestResult);
        // Test #5
        const defaultNoManifestResponse = await fetch('/test-files/client/index.html', {
            method: 'GET',
            headers: { 'x-cf-test-no-manifest': 'true' },
        });
        const defaultNoManifestResult = {
            description: 'getAssetFromKV if no asset manifest /client -> client fails',
            testFacets: [],
        };
        if (!defaultNoManifestResponse.ok) {
            defaultNoManifestResult.testFacets.push({ description: 'no file served', result: true });
            if (defaultNoManifestResponse.status === 404) {
                defaultNoManifestResult.testFacets.push({
                    description: 'response status code 404',
                    result: true,
                });
            }
            else {
                defaultNoManifestResult.testFacets.push({
                    description: `incorrect response status code (${defaultNoManifestResponse.status}) should be 404`,
                    result: false,
                });
            }
        }
        else {
            defaultNoManifestResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(defaultNoManifestResult);
        // Test #6
        const defaultToIndexHtmlResponse = await fetch('test-files/sub/', { method: 'GET' });
        const defaultToIndexHtmlResult = {
            description: 'getAssetFromKV if sub/ -> sub/index.html served',
            testFacets: [],
        };
        if (defaultToIndexHtmlResponse.ok) {
            const contentHash = await getCFStyleXXHash(await defaultToIndexHtmlResponse.blob());
            const contentType = defaultToIndexHtmlResponse.headers.get('content-type');
            if (contentHash === '5c7311b943') {
                defaultToIndexHtmlResult.testFacets.push({
                    description: '/sub/index.html served',
                    result: true,
                });
            }
            else {
                defaultToIndexHtmlResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
            if (contentType === 'text/html; charset=utf-8') {
                defaultToIndexHtmlResult.testFacets.push({ description: 'correct mime type', result: true });
            }
            else {
                defaultToIndexHtmlResult.testFacets.push({
                    description: `incorrect mime type (${contentType}) should be text/html; charset=utf-8`,
                    result: false,
                });
            }
        }
        else {
            defaultToIndexHtmlResult.testFacets.push({
                description: '/sub/index.html not served',
                result: false,
            });
        }
        testResults.push(defaultToIndexHtmlResult);
        const test19Result = {
            description: 'getAssetFromKV with no trailing slash on root',
            testFacets: [],
        };
        const noTrailingSlashPageTest = await fetch('', { method: 'GET' });
        if (noTrailingSlashPageTest.ok) {
            const contentHash = await getCFStyleXXHash(await noTrailingSlashPageTest.blob());
            if (contentHash === '482060b178') {
                test19Result.testFacets.push({ description: 'index.html served', result: true });
            }
            else {
                test19Result.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            test19Result.testFacets.push({ description: 'index.html not served', result: false });
        }
        testResults.push(test19Result);
        // Test #21
        const doesNotExistResponse = await fetch('/does-not-exist', { method: 'GET' });
        const doesNotExistResult = {
            description: 'getAssetFromKV no result throws an error',
            testFacets: [],
        };
        if (!doesNotExistResponse.ok) {
            doesNotExistResult.testFacets.push({ description: 'no file served', result: true });
            if (doesNotExistResponse.status === 404) {
                doesNotExistResult.testFacets.push({ description: 'response status code 404', result: true });
            }
            else {
                doesNotExistResult.testFacets.push({
                    description: `incorrect response status code (${doesNotExistResponse.status}) should be 404`,
                    result: false,
                });
            }
            if ((await doesNotExistResponse.text()) === 'NotFoundError thrown') {
                doesNotExistResult.testFacets.push({ description: 'NotFoundError thrown', result: true });
            }
            else {
                doesNotExistResult.testFacets.push({ description: 'NotFoundError not thrown', result: false });
            }
        }
        else {
            doesNotExistResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(doesNotExistResult);
        // Test #25
        const noBoundNamespaceResponse = await fetch('test-files/client/', {
            method: 'GET',
            headers: { 'x-cf-test-no-namespace': 'true' },
        });
        const noBoundNamespaceResult = {
            description: 'getAssetFromKV when namespace not bound fails',
            testFacets: [],
        };
        if (!noBoundNamespaceResponse.ok) {
            noBoundNamespaceResult.testFacets.push({ description: 'file not served', result: true });
            if (noBoundNamespaceResponse.status === 500) {
                noBoundNamespaceResult.testFacets.push({
                    description: 'correct response status code (500)',
                    result: true,
                });
            }
            else {
                noBoundNamespaceResult.testFacets.push({
                    description: `incorrect response status code (${noBoundNamespaceResponse.status}) should be 500`,
                    result: false,
                });
            }
        }
        else {
            noBoundNamespaceResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(noBoundNamespaceResult);
        return testResults;
    };

    const runTests$3 = async function () {
        const testResults = [];
        // Test #11
        const userDecodedResponse = await fetch('test-files/%E4%BD%A0%E5%A5%BD/', { method: 'GET' });
        const standardResponse = await fetch('test-files/你好/', { method: 'GET' }); // This seems to send encoded rather than plain text
        const userDecodedResult = {
            description: 'getAssetFromKV Support for user decode url path',
            testFacets: [],
        };
        const contentHash11a = await getCFStyleXXHash(await userDecodedResponse.blob());
        const contentHash11b = await getCFStyleXXHash(await standardResponse.blob());
        if (userDecodedResponse.ok && standardResponse.ok) {
            if (contentHash11a === contentHash11b) {
                userDecodedResult.testFacets.push({ description: 'same files returned', result: true });
            }
            else {
                userDecodedResult.testFacets.push({ description: 'different files returned', result: false });
            }
        }
        else {
            userDecodedResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(userDecodedResult);
        // MapRequestToAsset Test #3
        const aboutMeDocumentResponse = await fetch('test-files/about.me/', { method: 'GET' });
        const aboutMeDocumentResult = {
            description: 'mapRequestToAsset() correctly changes test-files/about.me/ -> test-files/about.me/index.html',
            testFacets: [],
        };
        if (aboutMeDocumentResponse.ok) {
            const contentHash = await getCFStyleXXHash(await aboutMeDocumentResponse.blob());
            if (contentHash === 'f9e78fb64c') {
                aboutMeDocumentResult.testFacets.push({ description: 'correct file served', result: true });
            }
            else {
                aboutMeDocumentResult.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            aboutMeDocumentResult.testFacets.push({
                description: '/test-files/client/index.html not served',
                result: false,
            });
        }
        testResults.push(aboutMeDocumentResult);
        return testResults;
    };

    const wait$1 = (ms) => new Promise((res) => setTimeout(res, ms));
    const runTests$2 = async function () {
        const testResults = [];
        const firstResponse = await fetch('test-files/etag.txt', {
            method: 'GET',
            headers: { 'x-cf-test-edge-ttl': '720', 'if-none-match': 'test-files/etag.2f7262e5aa.txt' },
        });
        wait$1(200);
        const secondResponse = await fetch('test-files/etag.txt', {
            method: 'GET',
            headers: { 'if-none-match': firstResponse.headers.get('etag') },
        });
        wait$1(200);
        const thirdResponse = await fetch('test-files/etag.txt', {
            method: 'GET',
            headers: { 'if-none-match': `"${firstResponse.headers.get('etag')}-another-version"` },
        });
        // Test #27
        const staleEtagTestResult = {
            description: 'getAssetFromKV when if-none-match equals etag of stale resource then should bypass cache',
            testFacets: [],
        };
        let firstContentHash;
        if (firstResponse.ok && secondResponse.status === 304 && thirdResponse.ok) {
            firstContentHash = await getCFStyleXXHash(await firstResponse.blob());
            const thirdContentHash = await getCFStyleXXHash(await thirdResponse.blob());
            if (firstContentHash === '2f7262e5aa' && firstContentHash === thirdContentHash) {
                staleEtagTestResult.testFacets.push({ description: 'correct files served', result: true });
            }
            else {
                staleEtagTestResult.testFacets.push({ description: 'incorrect files served', result: false });
            }
            if (firstResponse.headers.get('cf-cache-status') === 'MISS') {
                staleEtagTestResult.testFacets.push({
                    description: 'correct (MISS) cf-cache-status set on first response',
                    result: true,
                });
            }
            else {
                staleEtagTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on first response',
                    result: false,
                });
            }
            if (secondResponse.headers.get('cf-cache-status') === 'REVALIDATED') {
                staleEtagTestResult.testFacets.push({
                    description: 'correct (REVALIDATED) cf-cache-status set on second response',
                    result: true,
                });
            }
            else {
                staleEtagTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on second response',
                    result: false,
                });
            }
            if (thirdResponse.headers.get('cf-cache-status') === 'HIT') {
                staleEtagTestResult.testFacets.push({
                    description: 'correct (HIT) cf-cache-status set on third (stale etag) response',
                    result: true,
                });
            }
            else {
                staleEtagTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on third (stale etag)  response',
                    result: false,
                });
            }
        }
        else {
            staleEtagTestResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(staleEtagTestResult);
        // Test #28
        const weakendEtagResult = {
            description: 'getAssetFromKV when resource in cache, etag should be weakened before returned to eyeball',
            testFacets: [],
        };
        if (secondResponse.status === 304) {
            weakendEtagResult.testFacets.push({ description: 'correct response status', result: true });
            if (secondResponse.headers.get('cf-cache-status') === 'REVALIDATED') {
                weakendEtagResult.testFacets.push({
                    description: 'correct (REVALIDATED) cf-cache-status set on response',
                    result: true,
                });
            }
            else {
                weakendEtagResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on response',
                    result: false,
                });
            }
            if (secondResponse.headers.get('etag') === 'W/"test-files/etag.2f7262e5aa.txt"') {
                weakendEtagResult.testFacets.push({
                    description: 'correct (weakened) etag header on response',
                    result: true,
                });
            }
            else {
                weakendEtagResult.testFacets.push({
                    description: 'incorrect (weakened) etag header on response',
                    result: false,
                });
            }
        }
        else {
            weakendEtagResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(weakendEtagResult);
        return testResults;
    };

    const wait = (ms) => new Promise((res) => setTimeout(res, ms));
    const runTests$1 = async function () {
        const testResults = [];
        // Test #14
        const browserTTLTestResponse = await fetch('/test-files/test', {
            method: 'GET',
            headers: { 'x-cf-test-browser-ttl': '22' },
        });
        const browaerTTLTestResult = {
            description: 'getAssetFromKV when setting browser caching',
            testFacets: [],
        };
        if (browserTTLTestResponse.ok) {
            const contentHash = await getCFStyleXXHash(await browserTTLTestResponse.blob());
            const contentType = browserTTLTestResponse.headers.get('content-type');
            if (contentHash === 'b2f42f032f') {
                browaerTTLTestResult.testFacets.push({ description: 'correct file served', result: true });
            }
            else {
                browaerTTLTestResult.testFacets.push({ description: 'correct file served', result: false });
            }
            if (browserTTLTestResponse.headers.get('cache-control') === 'max-age=22') {
                browaerTTLTestResult.testFacets.push({ description: 'correct browserTTL set', result: true });
            }
            else {
                browaerTTLTestResult.testFacets.push({ description: 'correct browserTTL set', result: false });
            }
            if (contentType === 'text/plain; charset=utf-8') {
                browaerTTLTestResult.testFacets.push({ description: 'correct mime type', result: true });
            }
            else {
                browaerTTLTestResult.testFacets.push({ description: 'correct mime type', result: false });
            }
        }
        else {
            browaerTTLTestResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(browaerTTLTestResult);
        // Test #15
        const pngRequest = await fetch('/test-files/cf-logo-h-rgb-rev.png', {
            method: 'GET',
            headers: { 'x-cf-test-browser-ttl': '1', 'x-cf-test-edge-ttl': '60', 'if-none-match': '' },
        }); // null if-none-match to stop Safari sending real one and impacting lower tests
        const jpgRequest = await fetch('/test-files/sub/cf-logo-v-rgb.jpg', {
            method: 'GET',
            headers: { 'x-cf-test-bypass-cache': 'true' },
        });
        const customCacheSettingResult = {
            description: 'getAssetFromKV when setting custom cache setting',
            testFacets: [],
        };
        const pngContentType = pngRequest.headers.get('content-type');
        const pngContentHash = await getCFStyleXXHash(await pngRequest.blob());
        const jpgContentType = jpgRequest.headers.get('content-type');
        const jpgContentHash = await getCFStyleXXHash(await jpgRequest.blob());
        if (pngRequest.ok && jpgRequest.ok) {
            if (jpgContentHash === '53b5d46203') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct jpg file served',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect jpg file served',
                    result: false,
                });
            }
            if (jpgRequest.headers.get('cache-control') === null) {
                customCacheSettingResult.testFacets.push({
                    description: 'correct (no) browserTTL set on jpg response',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect browserTTL set on jpg response',
                    result: false,
                });
            }
            if (jpgRequest.headers.get('cf-cache-status') === null) {
                customCacheSettingResult.testFacets.push({
                    description: 'correct (no) cf-cache-status set on jpg response',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on jpg response',
                    result: false,
                });
            }
            if (jpgContentType === 'image/jpeg') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: false,
                });
            }
            if (pngContentHash === '5d350150a9') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct png file served',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect png file served',
                    result: false,
                });
            }
            if (pngRequest.headers.get('cache-control') === 'max-age=1') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct browserTTL set on png response',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect browserTTL set on png response',
                    result: false,
                });
            }
            if (pngRequest.headers.get('cf-cache-status') === 'MISS') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct (MISS) cf-cache-status set on png response',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on png response',
                    result: false,
                });
            }
            if (pngRequest.headers.get('content-length') === '9050') {
                customCacheSettingResult.testFacets.push({
                    description: `correct content-length header (${pngRequest.headers.get('content-length')}) set on png response`,
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: `incorrect content-length header (${pngRequest.headers.get('content-length')}) set on png response`,
                    result: false,
                });
            }
            if (pngContentType === 'image/png') {
                customCacheSettingResult.testFacets.push({
                    description: 'correct png mime type',
                    result: true,
                });
            }
            else {
                customCacheSettingResult.testFacets.push({
                    description: 'correct png mime type',
                    result: false,
                });
            }
        }
        else {
            customCacheSettingResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(customCacheSettingResult);
        await wait(1100);
        const pngRequestCacheTest = await fetch('/test-files/cf-logo-h-rgb-rev.png', {
            method: 'GET',
            headers: { 'if-none-match': pngRequest.headers.get('etag') },
        });
        const jpgRequestCacheTest = await fetch('/test-files/sub/cf-logo-v-rgb.jpg', {
            method: 'GET',
            headers: { 'x-cf-test-bypass-cache': 'true' },
        });
        const sequentialRequestTestResult = {
            description: 'getAssetFromKV caches on two sequential requests',
            testFacets: [],
        };
        const pngCacheTestContentType = pngRequestCacheTest.headers.get('content-type');
        const jpgCacheTestContentType = jpgRequestCacheTest.headers.get('content-type');
        const jpgCacheTestContentHash = await getCFStyleXXHash(await jpgRequestCacheTest.blob());
        if (pngRequestCacheTest.status === 304 && jpgRequestCacheTest.ok) {
            if (jpgCacheTestContentHash === '53b5d46203') {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct jpg file served',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect jpg file served',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.headers.get('cache-control') === null) {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct (no) browserTTL set on jpg response',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect browserTTL set on jpg response',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.headers.get('cf-cache-status') === null) {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct (no) cf-cache-status set on jpg response',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on jpg response',
                    result: false,
                });
            }
            if (jpgCacheTestContentType === 'image/jpeg') {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.status === 200) {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct jpg response status code (200)',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect jpg response status code ',
                    result: false,
                });
            }
            if (pngRequestCacheTest.headers.get('cf-cache-status') === 'REVALIDATED') {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct (REVALIDATED) cf-cache-status set on second png response',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on second png response',
                    result: false,
                });
            }
            if (pngCacheTestContentType === 'image/png') {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct png mime type',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct png mime type',
                    result: false,
                });
            }
            if (pngRequestCacheTest.status === 304) {
                sequentialRequestTestResult.testFacets.push({
                    description: 'correct png response status code (304)',
                    result: true,
                });
            }
            else {
                sequentialRequestTestResult.testFacets.push({
                    description: 'incorrect png response status code ',
                    result: false,
                });
            }
        }
        else {
            sequentialRequestTestResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(sequentialRequestTestResult);
        // Test #29
        wait(200);
        const thirdResponse = await fetch('/test-files/cf-logo-h-rgb-rev.png', { method: 'GET' });
        const noIfNoneMatchResult = {
            description: 'getAssetFromKV if-none-match not sent but resource in cache, should return cache hit 200 OK',
            testFacets: [],
        };
        if (thirdResponse.ok) {
            const fourthContentHash = await getCFStyleXXHash(await thirdResponse.blob());
            if (fourthContentHash === '5d350150a9' && thirdResponse.status === 200) {
                noIfNoneMatchResult.testFacets.push({
                    description: 'correct file/status code served',
                    result: true,
                });
            }
            else {
                noIfNoneMatchResult.testFacets.push({
                    description: 'incorrect file or status code served',
                    result: false,
                });
            }
            if (thirdResponse.headers.get('cf-cache-status') === 'HIT') {
                noIfNoneMatchResult.testFacets.push({
                    description: 'correct (HIT) cf-cache-status set on response',
                    result: true,
                });
            }
            else {
                noIfNoneMatchResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on response',
                    result: false,
                });
            }
        }
        else {
            noIfNoneMatchResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(noIfNoneMatchResult);
        const noNaxAgeOnSequentialResult = {
            description: 'getAssetFromKV does not store max-age on two sequential requests',
            testFacets: [],
        };
        if (pngRequest.ok && pngRequestCacheTest.status === 304) {
            if (pngRequest.headers.get('cache-control') === 'max-age=1' &&
                pngRequestCacheTest.headers.get('cache-control') === 'no-store, must-revalidate') {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'correct (no) browserTTL set on png requests',
                    result: true,
                });
            }
            else {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'incorrect browserTTL set on at least one png response',
                    result: false,
                });
            }
            if (pngRequest.headers.get('cf-cache-status') === 'MISS') {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'correct (MISS) cf-cache-status set on png response',
                    result: true,
                });
            }
            else {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on png response',
                    result: false,
                });
            }
            if (pngRequestCacheTest.headers.get('cf-cache-status') === 'REVALIDATED') {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'correct (REVALIDATED) cf-cache-status set on second png response',
                    result: true,
                });
            }
            else {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on second png response',
                    result: false,
                });
            }
            if (pngContentType === 'image/png' && pngCacheTestContentType === 'image/png') {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'correct png mime types',
                    result: true,
                });
            }
            else {
                noNaxAgeOnSequentialResult.testFacets.push({
                    description: 'incorrect png mime types',
                    result: false,
                });
            }
        }
        else {
            noNaxAgeOnSequentialResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(noNaxAgeOnSequentialResult);
        const bypassCFCacheTestResult = {
            description: 'getAssetFromKV does not cache on Cloudflare when bypass cache set',
            testFacets: [],
        };
        if (jpgRequestCacheTest.ok) {
            if (jpgCacheTestContentHash === '53b5d46203') {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct jpg file served',
                    result: true,
                });
            }
            else {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'incorrect jpg file served',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.headers.get('cache-control') === null) {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct (no) browserTTL set on jpg response',
                    result: true,
                });
            }
            else {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'incorrect browserTTL set on jpg response',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.headers.get('cf-cache-status') === null) {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct (no) cf-cache-status set on jpg response',
                    result: true,
                });
            }
            else {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on jpg response',
                    result: false,
                });
            }
            if (jpgCacheTestContentType === 'image/jpeg') {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: true,
                });
            }
            else {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct jpg mime type',
                    result: false,
                });
            }
            if (jpgRequestCacheTest.status === 200) {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'correct jpg response status code (200)',
                    result: true,
                });
            }
            else {
                bypassCFCacheTestResult.testFacets.push({
                    description: 'incorrect jpg response status code ',
                    result: false,
                });
            }
        }
        else {
            bypassCFCacheTestResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(bypassCFCacheTestResult);
        // Test #22
        const nullCacheTest = await fetch('/test-files/client/index.html', {
            method: 'GET',
            headers: { 'x-cf-test-edge-ttl': 'null', 'x-cf-test-browser-ttl': 'null' },
        });
        await wait(200);
        const secondNullCacheTest = await fetch('/test-files/client/index.html', {
            method: 'GET',
            headers: { 'x-cf-test-edge-ttl': 'null', 'x-cf-test-browser-ttl': 'null' },
        });
        const nullTTLsTestResult = {
            description: 'getAssetFromKV TTls set to null should not cache on browser or edge',
            testFacets: [],
        };
        if (nullCacheTest.ok && secondNullCacheTest.ok) {
            const nullTestContentContentHash = await getCFStyleXXHash(await nullCacheTest.blob());
            const secondNullTestContentHash = await getCFStyleXXHash(await secondNullCacheTest.blob());
            if (nullTestContentContentHash === 'e24b5b69a5' &&
                nullTestContentContentHash === secondNullTestContentHash) {
                nullTTLsTestResult.testFacets.push({ description: 'correct files served', result: true });
            }
            else {
                nullTTLsTestResult.testFacets.push({ description: 'incorrect files served', result: false });
            }
            if (nullCacheTest.headers.get('cache-control') === null &&
                secondNullCacheTest.headers.get('cache-control') === null) {
                nullTTLsTestResult.testFacets.push({
                    description: 'correct (no) browserTTL set on responses',
                    result: true,
                });
            }
            else {
                nullTTLsTestResult.testFacets.push({
                    description: 'incorrect browserTTL set on one or more response',
                    result: false,
                });
            }
            if (secondNullCacheTest.headers.get('cf-cache-status') === null &&
                secondNullCacheTest.headers.get('cf-cache-status') === null) {
                nullTTLsTestResult.testFacets.push({
                    description: 'correct (no) cf-cache-status set on jpg response',
                    result: true,
                });
            }
            else {
                nullTTLsTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on jpg response',
                    result: false,
                });
            }
            if (secondNullCacheTest.status === 200 && nullCacheTest.status === 200) {
                nullTTLsTestResult.testFacets.push({
                    description: 'correct response status code (200)',
                    result: true,
                });
            }
            else {
                nullTTLsTestResult.testFacets.push({
                    description: 'incorrect response status code on one or both files',
                    result: false,
                });
            }
        }
        else {
            nullTTLsTestResult.testFacets.push({ description: 'files not served', result: false });
        }
        testResults.push(nullTTLsTestResult);
        // Test #30
        const rangeHTMLRequest = await fetch('/test-files/sub/index.html', { method: 'GET' });
        await wait(200);
        const rangeHTMLRequestCacheTest = await fetch('/test-files/sub/index.html', {
            method: 'GET',
            headers: { range: 'bytes=0-10' },
        });
        const rangeHTMLCacheTestContentType = rangeHTMLRequestCacheTest.headers.get('content-type');
        const rangeHTMLRequestTestResult = {
            description: 'getAssetFromKV if range request submitted and resource in cache, request fulfilled',
            testFacets: [],
        };
        if (rangeHTMLRequestCacheTest.ok) {
            const contentHash = await getCFStyleXXHash(await rangeHTMLRequest.blob());
            if (contentHash === '5c7311b943') {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'correct file served',
                    result: true,
                });
            }
            else {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
            if (rangeHTMLCacheTestContentType === 'text/html; charset=utf-8') {
                rangeHTMLRequestTestResult.testFacets.push({ description: 'correct mime type', result: true });
            }
            else {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'incorrect mime type',
                    result: false,
                });
            }
            if (rangeHTMLRequestCacheTest.status === 206) {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'correct status code (' + rangeHTMLRequestCacheTest.status + ') on response',
                    result: true,
                });
            }
            else {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'incorrect status code (' + rangeHTMLRequestCacheTest.status + ') on response',
                    result: false,
                });
            }
            if (rangeHTMLRequestCacheTest.headers.get('content-range') !== null) {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'content range header on response',
                    result: true,
                });
            }
            else {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'no content range header on response',
                    result: false,
                });
            }
            if (rangeHTMLRequestCacheTest.headers.get('cf-cache-status') === 'HIT') {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'correct (HIT) cf-cache-status set on response',
                    result: true,
                });
            }
            else {
                rangeHTMLRequestTestResult.testFacets.push({
                    description: 'incorrect cf-cache-status set on response',
                    result: false,
                });
            }
        }
        else {
            rangeHTMLRequestTestResult.testFacets.push({ description: 'file not served', result: false });
        }
        testResults.push(rangeHTMLRequestTestResult);
        return testResults;
    };

    const runTests = async function () {
        const testResults = [];
        // Test #1
        const defaultDocumentResult = {
            description: 'serveSinglePageApp returns root asset path when request path ends in .html',
            testFacets: [],
        };
        const defaultPageTest = await fetch('/thing.html', {
            method: 'GET',
            headers: { 'x-cf-test-single-page-app': 'true' },
        });
        if (defaultPageTest.ok) {
            const contentHash = await getCFStyleXXHash(await defaultPageTest.blob());
            if (contentHash === '482060b178') {
                defaultDocumentResult.testFacets.push({ description: 'index.html served', result: true });
            }
            else {
                defaultDocumentResult.testFacets.push({ description: 'incorrect file served', result: false });
            }
        }
        else {
            defaultDocumentResult.testFacets.push({ description: 'index.html not served', result: false });
        }
        testResults.push(defaultDocumentResult);
        // Test #2
        const noExtensionDocumentResult = {
            description: 'serveSinglePageApp returns root asset path when request path does not have extension',
            testFacets: [],
        };
        const noExtensionPageTest = await fetch('/thing', {
            method: 'GET',
            headers: { 'x-cf-test-single-page-app': 'true' },
        });
        if (noExtensionPageTest.ok) {
            const contentHash = await getCFStyleXXHash(await noExtensionPageTest.blob());
            if (contentHash === '482060b178') {
                noExtensionDocumentResult.testFacets.push({ description: 'index.html served', result: true });
            }
            else {
                noExtensionDocumentResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
        }
        else {
            noExtensionDocumentResult.testFacets.push({
                description: 'index.html not served',
                result: false,
            });
        }
        testResults.push(noExtensionDocumentResult);
        // Test #2
        const nonHTHMLExtensionDocumentResult = {
            description: 'serveSinglePageApp returns requested asset when request path has non-html extension',
            testFacets: [],
        };
        const nonHTHMLExtensionPageTest = await fetch('/test-files/empty.txt', {
            method: 'GET',
            headers: { 'x-cf-test-single-page-app': 'true' },
        });
        if (nonHTHMLExtensionPageTest.ok) {
            const contentHash = await getCFStyleXXHash(await nonHTHMLExtensionPageTest.blob());
            if (contentHash === 'ef46db3751') {
                nonHTHMLExtensionDocumentResult.testFacets.push({
                    description: 'correct file served',
                    result: true,
                });
            }
            else {
                nonHTHMLExtensionDocumentResult.testFacets.push({
                    description: 'incorrect file served',
                    result: false,
                });
            }
        }
        else {
            nonHTHMLExtensionDocumentResult.testFacets.push({
                description: 'file not served',
                result: false,
            });
        }
        testResults.push(nonHTHMLExtensionDocumentResult);
        return testResults;
    };

    const sortedManifestArr = [];
    const cfHash = /[a-zA-Z0-9]{10}/;
    const headers = ['filename', 'path', 'contentType', 'cfHash', 'xHash64', 'cf-cache-status'];
    const tableClasses = ['border-collapse', 'table-auto', 'w-full', 'text-xs', 'mt-4'];
    const thClasses = ['pl-4', 'pb-2'];
    const tHeadClasses = [
        'bg-gray-50',
        'text-sm',
        'text-gray-400',
        'border-b',
        'border-gray-200',
        'font-medium',
        'pl-4',
        'text-left',
    ];
    const rowClasses = ['border-b', 'border-gray-200'];
    const tdClasses = ['pl-4', 'py-2', 'bg-white'];
    const infoElClasses = ['flex', 'flex-row', 'ml-6', 'items-center', 'my-1'];
    const checkSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>';
    const crossSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>';
    const infoSvg = '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    /*
        Tests incorporated from existing:

        1. getAssetFromKV return correct val from KV and default caching
            - Test with actual or test files

        2. getAssetFromKV evaluated the file matching the extensionless path first /client/ -> client
            - In the context of a wrangler publish, this (combined with #3) is impossible as it would require both a file and a dir of the same name
            - Code actually resolves to /client/index.html - default page is effectively the same test

        3. getAssetFromKV evaluated the file matching the extensionless path first /client -> client
            - In the context of a wrangler publish, this (combined with #2) is impossible as it would require both a file and a dir of the same name

        4. getAssetFromKV if not in asset manifest still returns nohash.txt
            - In the context of a wrangler publish, this is impossible as every file would be hashed.

        5. getAssetFromKV if no asset manifest /client -> client fails

        6. getAssetFromKV if sub/ -> sub/index.html served

        7. getAssetFromKV gets index.html by default for / requests
            - Tested by default with main page

        8. getAssetFromKV non ASCII path support (测试.html)
            - Tested by actual file

        9. getAssetFromKV supports browser percent encoded URLs
            - Tested by actual file (request URL will need to be encoded)

        10. getAssetFromKV only decode URL when necessary
            - Tested by actual file

        11. getAssetFromKV Support for user decode url path

        12. getAssetFromKV custom key modifier
            - This is somewhat user implementation specific

        13. getAssetFromKV request override with existing manifest file
            - This is somewhat user implementation specific, but tested with #14

        14. getAssetFromKV when setting browser caching

        15. getAssetFromKV when setting custom cache setting

        16. getAssetFromKV caches on two sequential requests
            - Combined with #15
            - Can the browser settings (e.g. disable cache in Chrome impact this?)

        17. getAssetFromKV does not store max-age on two sequential requests

        18. getAssetFromKV does not cache on Cloudflare when bypass cache set
            - Tested by #15/#16

        19. getAssetFromKV with no trailing slash on root
            - Tested by this page with default static file structure

        20. getAssetFromKV with no trailing slash on a subdirectory
            - Tested by multiple other tests

        21. getAssetFromKV no result throws an error

        22. getAssetFromKV TTls set to null should not cache on browser or edge

        23. getAssetFromKV passing in a custom NAMESPACE serves correct asset
            - Is the model with module workers - implictly tested

        24. getAssetFromKV when custom namespace without the asset should fail
            - As above

        25. getAssetFromKV when namespace not bound fails

        26. getAssetFromKV when if-none-match === active resource version, should revalidate
            - Tested by #15/#16

        27. getAssetFromKV when if-none-match equals etag of stale resource then should bypass cache
            - Merge with #15/#16 (but should return HIT rather than MISS)

        28. getAssetFromKV when resource in cache, etag should be weakened before returned to eyeball
            - Merge with #15/#16

        29. getAssetFromKV if-none-match not sent but resource in cache, should return cache hit 200 OK
            - Merge with #15/#16

        30. getAssetFromKV if range request submitted and resource in cache, request fulfilled


        // Changes

        28: Should return HIT rather than miss
        
    */
    const addInfoElemenToStatus = (text) => {
        const statusEl = document.getElementById('status');
        const infoEl = document.createElement('div');
        const infoIcon = document.createElement('div');
        infoIcon.innerHTML = infoSvg;
        infoEl.classList.add(...infoElClasses);
        const infoElDescription = document.createElement('div');
        infoElDescription.textContent = text;
        infoEl.appendChild(infoIcon);
        infoEl.appendChild(infoElDescription);
        statusEl.appendChild(infoEl);
    };
    const displayReferenceTestResults = (referenceTestResults) => {
        const resultEl = document.getElementById('result');
        for (const result of referenceTestResults) {
            const testEl = document.createElement('div');
            const testName = document.createElement('div');
            testName.textContent = result.description;
            testName.classList.add(...['mt-2', 'ml-2', 'mb-1', 'text-gray-900']);
            testEl.appendChild(testName);
            for (const facet of result.testFacets) {
                const facetEl = document.createElement('div');
                facetEl.classList.add(...['flex', 'flex-row', 'ml-2', 'items-center']);
                const facetDescription = document.createElement('div');
                const facetOutcome = document.createElement('div');
                facetDescription.textContent = facet.description;
                if (facet.result) {
                    facetOutcome.innerHTML = checkSvg;
                    facetOutcome.classList.add(...['text-green-600', 'ml-2']);
                }
                else {
                    facetOutcome.innerHTML = crossSvg;
                    facetOutcome.classList.add(...['text-red-600', 'ml-2']);
                }
                facetEl.appendChild(facetOutcome);
                facetEl.appendChild(facetDescription);
                testEl.appendChild(facetEl);
            }
            resultEl.appendChild(testEl);
        }
        return;
    };
    const disableButtons = () => {
        const runReferenceTestsBtn = document.getElementById('run_reference_tests_button');
        const downloadManifestBtn = document.getElementById('download_manifest_btn');
        const downloadManifestFilesBtn = document.getElementById('download_manifest_files_btn');
        if (runReferenceTestsBtn)
            runReferenceTestsBtn.disabled = true;
        if (downloadManifestBtn)
            downloadManifestBtn.disabled = true;
        if (downloadManifestFilesBtn)
            downloadManifestFilesBtn.disabled = true;
    };
    const enableButtons = () => {
        const runReferenceTestsBtn = document.getElementById('run_reference_tests_button');
        const downloadManifestBtn = document.getElementById('download_manifest_btn');
        const downloadManifestFilesBtn = document.getElementById('download_manifest_files_btn');
        if (runReferenceTestsBtn)
            runReferenceTestsBtn.disabled = false;
        if (downloadManifestBtn)
            downloadManifestBtn.disabled = false;
        if (downloadManifestFilesBtn)
            downloadManifestFilesBtn.disabled = false;
    };
    const runReferenceTests = async () => {
        const testResults = [];
        const statusEl = document.getElementById('status');
        statusEl.innerHTML = '';
        disableButtons();
        addInfoElemenToStatus('running reference tests');
        addInfoElemenToStatus('note that cache tests can be impacted by the state of the cache at test time and browser nuances');
        testResults.push(...(await runTests$4()));
        testResults.push(...(await runTests$3()));
        if (/workers\.dev/.test(window.location.hostname)) {
            addInfoElemenToStatus('cache tests will not run on workers.dev domain');
        }
        else {
            testResults.push(...(await runTests$2()));
            testResults.push(...(await runTests$1()));
        }
        testResults.push(...(await runTests()));
        const resultEl = document.getElementById('result');
        resultEl.replaceChildren();
        resultEl.classList.remove(...resultEl.classList);
        resultEl.classList.add(...['my-2', 'pt-2', 'border', 'border-grey-100', 'rounded-xl', 'text-sm', 'flex', 'flex-col']);
        statusEl.removeChild(statusEl.children[0]);
        displayReferenceTestResults(testResults);
        enableButtons();
    };
    const loadManifestFiles = async () => {
        if (sortedManifestArr.length === 0)
            return;
        const manifestTable = document.getElementById('manifest_table');
        if (!manifestTable)
            return;
        const statusEl = document.getElementById('status');
        statusEl.innerHTML = '';
        disableButtons();
        addInfoElemenToStatus('downloading static files');
        const filterEl = document.getElementById('file_filter_regex');
        let filterRegex = null;
        if (filterEl.value !== '')
            filterRegex = new RegExp(filterEl.value);
        for (const entry of sortedManifestArr) {
            if (entry.xHash)
                continue;
            if (filterRegex && !filterRegex.test(entry.filePath))
                continue;
            const row = document.getElementById(entry.filePath);
            if (!row)
                continue;
            const fileResponse = await fetch(encodeURI(entry.filePath), {
                method: 'GET',
            });
            if (fileResponse.ok) {
                if (entry.cfHash) {
                    const hashSubStr = await getCFStyleXXHash(await fileResponse.blob());
                    entry.xHash = hashSubStr;
                }
                entry.contentType = fileResponse.headers.get('content-type');
                entry.cacheStatus = fileResponse.headers.get('cf-cache-status');
                Object.entries(entry).forEach((en, ind) => {
                    const el = row.children[ind];
                    if (en[0] === 'xHash') {
                        el.innerHTML = en[1];
                        entry.xHash === entry.cfHash
                            ? el.classList.add('text-green-400')
                            : el.classList.add('text-red-400');
                    }
                    else if (en[0] === 'cacheStatus') {
                        if (en[1])
                            el.innerHTML = en[1];
                    }
                    else if (en[0] === 'contentType') {
                        if (en[1])
                            el.innerHTML = en[1];
                    }
                });
            }
            else {
                row.classList.add('text-red-400');
            }
        }
        statusEl.removeChild(statusEl.children[0]);
        addInfoElemenToStatus('download completed');
        enableButtons();
    };
    const loadManifest = async () => {
        const resultEl = document.getElementById('result');
        try {
            const statusEl = document.getElementById('status');
            statusEl.innerHTML = '';
            addInfoElemenToStatus('downloading manifest');
            disableButtons();
            const response = await fetch('/manifest', {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
            });
            if (response.ok) {
                sortedManifestArr.length = 0;
                resultEl.innerHTML = '';
                const manifest = (await response.json());
                for (const [fileNameAndPath, kvpath] of Object.entries(manifest)) {
                    const parts = fileNameAndPath.split('/');
                    // There is probably a clever regex way to do this, but this may be more robust to strange names and multiple hash scenarios
                    const kvPathParts = kvpath.split('.').reverse();
                    let cfHashMatch = null;
                    for (const part of kvPathParts) {
                        // One edge case exception (ten char word suffix), there may be more!
                        if (part === 'webmanifest')
                            continue;
                        if (cfHash.test(part)) {
                            cfHashMatch = part;
                            break;
                        }
                    }
                    const manifestEntry = {
                        fileName: parts[parts.length - 1],
                        filePath: fileNameAndPath,
                        contentType: null,
                        cfHash: cfHashMatch,
                        xHash: null,
                        cacheStatus: null,
                    };
                    sortedManifestArr.push(manifestEntry);
                }
                sortedManifestArr.sort((a, b) => String(a.fileName).localeCompare(b.fileName));
                const manifestTable = document.createElement('table');
                manifestTable.setAttribute('id', 'manifest_table');
                for (const entry of sortedManifestArr) {
                    const row = manifestTable.insertRow(-1);
                    row.setAttribute('id', entry.filePath);
                    row.classList.add(...rowClasses);
                    Object.entries(entry).forEach((en, ind) => {
                        const cell = row.insertCell(-1);
                        cell.classList.add(...tdClasses);
                        if (en[0] === 'fileName') {
                            const a = document.createElement('a');
                            a.setAttribute('href', encodeURI(entry.filePath));
                            a.innerHTML = en[1];
                            cell.appendChild(a);
                            cell.classList.add('hover:text-gray-900');
                        }
                        else {
                            if (en[1])
                                cell.innerHTML = en[1];
                        }
                    });
                }
                const header = manifestTable.createTHead();
                manifestTable.classList.add(...tableClasses);
                const headerRow = header.insertRow(0);
                headerRow.classList.add(...tHeadClasses);
                for (const header of headers) {
                    const el = document.createElement('th');
                    el.innerHTML = header;
                    el.classList.add(...thClasses);
                    headerRow.appendChild(el);
                }
                resultEl.appendChild(manifestTable);
                const downloadFilesBtn = document.getElementById('download_manifest_files_btn');
                if (downloadFilesBtn)
                    downloadFilesBtn.removeAttribute('disabled');
                statusEl.removeChild(statusEl.children[0]);
            }
            else {
                // TODO: reconnect?
                statusEl.removeChild(statusEl.children[0]);
                addInfoElemenToStatus('unable to download manifest');
            }
        }
        catch (e) {
            console.log(e);
        }
        finally {
            enableButtons();
        }
    };
    const updateFilter = function () {
        if (sortedManifestArr.length === 0)
            return;
        const filterEl = document.getElementById('file_filter_regex');
        if (!filterEl)
            return;
        try {
            const filterRegex = new RegExp(filterEl.value);
            for (const entry of sortedManifestArr) {
                const row = document.getElementById(entry.filePath);
                if (!row)
                    continue;
                if (filterRegex.test(entry.filePath)) {
                    row.classList.remove('hidden');
                }
                else {
                    row.classList.add('hidden');
                }
            }
        }
        catch (e) {
            // TODO: surface likely regex error in UI rather than console
            console.log(e);
        }
    };

    exports.loadManifest = loadManifest;
    exports.loadManifestFiles = loadManifestFiles;
    exports.runReferenceTests = runReferenceTests;
    exports.updateFilter = updateFilter;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
