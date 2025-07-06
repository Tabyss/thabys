import React, { useState } from 'react'

const gameMap = {
    level: 1,
    width: 7,
    height: 7,
    playerStart: { x: 1, y: 1 },
    tiles: [
        [1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 2, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 3, 1],
        [1, 1, 1, 1, 1, 1, 1]
    ]
};

const MiniGame = () => {
    const [player, setPlayer] = useState(gameMap.playerStart);

    const move = (dx: any, dy: any) => {
        let x = player.x;
        let y = player.y;

        while (true) {
            const nx = x + dx;
            const ny = y + dy;
            const nextTile = gameMap.tiles[ny]?.[nx];

            if (nextTile === undefined || nextTile === 1) break;

            x = nx;
            y = ny;

            if (nextTile === 3) {
                console.log("🎉 Collected!");
            }

            if (nextTile === 2) {
                console.log("🏁 Reached goal!");
            }
        }

        setPlayer({ x, y });
    };

    const handleKeyDown = (e: any) => {
        if (e.key === "ArrowUp") move(0, -1);
        if (e.key === "ArrowDown") move(0, 1);
        if (e.key === "ArrowLeft") move(-1, 0);
        if (e.key === "ArrowRight") move(1, 0);
    };

    return (
        <div tabIndex={0} onKeyDown={handleKeyDown}>
            <pre>
                {gameMap.tiles.map((row, y) =>
                    row.map((cell, x) =>
                        x === player.x && y === player.y
                            ? "P"
                            : cell === 1
                                ? "#"
                                : cell === 2
                                    ? "G"
                                    : cell === 3
                                        ? "*"
                                        : "."
                    ).join(" ")
                ).join("\n")}
            </pre>
        </div>
    )
}

export default MiniGame