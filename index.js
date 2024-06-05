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
    const queue = [[startX, startY, 0]];
    const visited = new Set();
    const startPosition = `${startX}, ${startY}`;
    const endPosition = `${endX}, ${endY}`;

    if (startPosition === endPosition){
      return 0;
    }

    while (queue.length > 0){
      const [x, y, depth] = queue.shift();
      const position = `${x}, ${y}`;

      if (!visited.has(position)){
        visited.add(position);

        for (const [dx, dy] of this.possibleMoves){
          const newX = x + dx;
          const newY = y + dy;
          const newPosition = `${newX}, ${newY}`;

          if (newPosition === endPosition){
            return depth + 1;
          }

          if (this.isValidMove(newX, newY) && !visited.has(newPosition)){
            queue.push([newX, newY, depth + 1]);
          }
        }
      }
    }
    return -1;
  }
}

const knight = new knightsMoves();
const startX = 0, startY = 0;
const endX = 7, endY = 7;
console.log(knight.findShortestPath(startX, startY, endX, endY));