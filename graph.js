class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let node of vertexArray){
      this.nodes.add(node)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex)
    for(let node of vertex.adjacent){
      node.adjacent.delete(vertex)
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    function DFS(vert, visited = new Set(), answer = []) {
      visited.add(vert);
      answer.push(vert.value);

      for (let node of vert.adjacent) {
        if (!visited.has(node)) {
          DFS(node, visited, answer);
        }
      }
      return answer;
    }
    return DFS(start);

  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let answer = [start.value]
    let seen = new Set([start])
    let queue = [start]
    while(queue.length>0){
      let current = queue.shift()
      for (let neighbor of current.adjacent){
        if (!(seen.has(neighbor))){
          seen.add(neighbor)
          answer.push(neighbor.value)
          queue.push(neighbor)
        }
      }
    }
    return answer
  }
}

module.exports = {Graph, Node}