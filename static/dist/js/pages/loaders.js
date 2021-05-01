let headerrequest = new Request('/navigation/header',initGet);
let sidebarrequest = new Request('/navigation/sidebar',initGet);
let footerrequest = new Request('/navigation/footer',initGet);
let header = document.getElementById('MainHeaderDiv');
let sidebar = document.getElementById('SideBarDiv');
let footer = document.getElementById('FooterDiv');
/** fetch the header **/
myFetch(headerrequest,header);
/** fetch the sidebar **/
myFetch(sidebarrequest,sidebar);
/** fetch the footer **/
myFetch(footerrequest,footer);
