<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        canvas {
            background-color: #000;
            display: block;
            margin: auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>

    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const box = 20;  // Size of the snake and food box
        let snake = [];  // Snake array
        snake[0] = { x: 9 * box, y: 10 * box };  // Initial position

        let food = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };

        let score = 0;
        let direction;

        // Control snake movement with keyboard arrows
        document.addEventListener('keydown', directionChange);

        function directionChange(event) {
            if (event.key === 'ArrowUp' && direction !== 'DOWN') {
                direction = 'UP';
            } else if (event.key === 'ArrowDown' && direction !== 'UP') {
                direction = 'DOWN';
            } else if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
                direction = 'LEFT';
            } else if (event.key === 'ArrowRight' && direction !== 'LEFT') {
                direction = 'RIGHT';
            }
        }

        // Check if the snake hits the wall or itself
        function collision(newHead, snakeArray) {
            for (let i = 0; i < snakeArray.length; i++) {
                if (newHead.x === snakeArray[i].x && newHead.y === snakeArray[i].y) {
                    return true;
                }
            }
            return false;
        }

        // Draw the snake and food on the canvas
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i === 0) ? '#00FF00' : '#FFFFFF';  // Head is green, body is white
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
            }

            ctx.fillStyle = '#FF0000';  // Food color
            ctx.fillRect(food.x, food.y, box, box);

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (direction === 'UP') snakeY -= box;
            if (direction === 'DOWN') snakeY += box;
            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'RIGHT') snakeX += box;

            if (snakeX === food.x && snakeY === food.y) {
                score++;
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                };
            } else {
                snake.pop();  // Remove last part of the snake if not eating food
            }

            const newHead = { x: snakeX, y: snakeY };

            // Game over conditions: hitting the wall or the snake's body
            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert('Game Over. Your score is ' + score);
            }

            snake.unshift(newHead);  // Add new head to the front of the snake

            // Display the score
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, box, box);
        }

        // Refresh game every 100 milliseconds
        let game = setInterval(draw, 100);
    </script>
</body>
</html>
