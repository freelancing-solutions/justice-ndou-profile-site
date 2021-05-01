let headerrequest = new Request('/navigation/header',initGet);
let header = document.getElementById('MainHeaderDiv');
let footerrequest = new Request('/navigation/footer',initGet);
let footer = document.getElementById('FooterDiv');
/** fetch the header **/
//myFetch(headerrequest,header);
/** fetch the sidebar **/

function loadFooter(){
    myFetch(footerrequest,footer);
}