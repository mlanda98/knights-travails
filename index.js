class knightsMoves {
  constructor(){
    this.possibleMoves = [
      [2,1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1] 
    ];
  }
  isValidMove(x, y){
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  findShortestPath(startX, startY, endX, endY){
    const queue = [[startX, startY]];
    const visited = new Set();
    const parents = new Map();
    const startPosition = `${startX}, ${startY}`;
    const endPosition = `${endX}, ${endY}`;

    if (startPosition === endPosition){
      return [[startX, startY]];
    }

    visited.add(startPosition);
    parents.set(startPosition, null);

    while (queue.length > 0){
      const [x, y] = queue.shift();
      const position = `${x}, ${y}`;

      for (const [dx, dy] of this.possibleMoves){
        const newX = x + dx;
        const newY = y + dy;
        const newPosition = `${newX}, ${newY}`;

        if (newPosition === endPosition){
          parents.set(newPosition, position);
          return this.constructPath(parents, startPosition, endPosition);
        }

          if (this.isValidMove(newX, newY) && !visited.has(newPosition)){
            queue.push([newX, newY]);
            visited.add(newPosition);
            parents.set(newPosition, position);
          }
      }
    }
    return [];
  }

  constructPath(parents, startPosition, endPosition){
    const path = [];
    let currentPosition = endPosition;

    while (currentPosition){
      const [x, y] = currentPosition.split(',').map(Number);
      path.unshift([x, y]);
      currentPosition = parents.get(currentPosition);
    }

    return path;
  }
}

const knight = new knightsMoves();
const startX = 0, startY = 0;
const endX = 8, endY = 8;
console.log(knight.findShortestPath(startX, startY, endX, endY));