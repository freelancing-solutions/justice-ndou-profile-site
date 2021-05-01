/**
 * find the shortest path between two nodes
 *
 *
 */



function Node(value){
    this.value = value;
    this.edges = [];
    this.searched = false;
    this.parent = null;
}


