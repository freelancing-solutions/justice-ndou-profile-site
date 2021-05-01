/**
 * find the shortest path between two nodes
 *
 *
 */


function Graph(){
    this.nodes = [];
    this.graph = {};
}

Graph.prototype.addNode =function(n){
    this.nodes.push(n);
    let index = n.value;
    this.graph[index] = n;
}