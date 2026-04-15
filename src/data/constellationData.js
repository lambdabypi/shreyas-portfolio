// src/data/constellationData.js
// Single source of truth for constellation shapes.
//
// Stars use a 400×300 coordinate space (same as the focus overlay SVG viewBox).
// `placement` drives how the shape is rendered on the canvas background:
//   cx, cy  – normalized [0,1] position of the constellation center on screen
//   scale   – fraction of min(canvasW, canvasH) / 400 used to map SVG coords to canvas
//
// To convert a star to canvas coordinates:
//   const pxScale = placement.scale * Math.min(canvas.width, canvas.height) / 400;
//   const centX   = mean of all star.x values
//   const centY   = mean of all star.y values
//   const canvasX = placement.cx * canvas.width  + (star.x - centX) * pxScale;
//   const canvasY = placement.cy * canvas.height + (star.y - centY) * pxScale;

const constellationData = [
	{
		id: 'ursa-minor',
		name: 'Little Dipper',
		level: 5,
		description: 'Your coding journey begins',
		color: '#60A5FA',
		placement: { cx: 0.22, cy: 0.20, scale: 0.22 },
		// Little Dipper: handle tip (Polaris) → cup, rectangle cup at the end
		stars: [
			{ x: 60,  y: 65  }, // 0 Polaris – handle tip
			{ x: 105, y: 98  }, // 1
			{ x: 152, y: 130 }, // 2
			{ x: 198, y: 148 }, // 3 cup corner (handle meets cup)
			{ x: 246, y: 130 }, // 4 cup
			{ x: 258, y: 178 }, // 5 cup
			{ x: 204, y: 192 }, // 6 cup
		],
		connections: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]],
		sizes: [5.5, 3.5, 3.5, 4.5, 3.5, 3.5, 3.5],
	},
	{
		id: 'cassiopeia',
		name: 'Cassiopeia',
		level: 10,
		description: 'The W of wisdom',
		color: '#A78BFA',
		placement: { cx: 0.78, cy: 0.18, scale: 0.28 },
		// Classic W/M shape – 5 stars in a zigzag
		stars: [
			{ x: 50,  y: 190 }, // 0
			{ x: 130, y: 100 }, // 1
			{ x: 200, y: 165 }, // 2
			{ x: 268, y: 88  }, // 3
			{ x: 348, y: 152 }, // 4
		],
		connections: [[0,1],[1,2],[2,3],[3,4]],
		sizes: [4, 5, 4, 5, 4],
	},
	{
		id: 'orion',
		name: 'Orion',
		level: 15,
		description: 'The mighty hunter',
		color: '#34D399',
		placement: { cx: 0.15, cy: 0.68, scale: 0.22 },
		// Shoulders, belt (3-star line), feet
		stars: [
			{ x: 118, y: 68  }, // 0 Betelgeuse – upper-left shoulder
			{ x: 272, y: 78  }, // 1 Bellatrix  – upper-right shoulder
			{ x: 142, y: 158 }, // 2 Alnitak    – belt left
			{ x: 200, y: 153 }, // 3 Alnilam    – belt center
			{ x: 258, y: 148 }, // 4 Mintaka    – belt right
			{ x: 148, y: 252 }, // 5 Saiph      – lower-left foot
			{ x: 278, y: 258 }, // 6 Rigel      – lower-right foot
		],
		connections: [[0,1],[0,2],[1,4],[2,3],[3,4],[2,5],[4,6]],
		sizes: [7, 5, 4, 5, 4, 5, 6],
	},
	{
		id: 'draco',
		name: 'Draco',
		level: 20,
		description: 'The dragon awakens',
		color: '#F59E0B',
		placement: { cx: 0.85, cy: 0.55, scale: 0.20 },
		// Quadrilateral head + long winding tail
		stars: [
			{ x: 305, y: 50  }, // 0 head
			{ x: 338, y: 76  }, // 1 head
			{ x: 328, y: 108 }, // 2 head
			{ x: 300, y: 93  }, // 3 head (connects to body)
			{ x: 268, y: 122 }, // 4 body
			{ x: 232, y: 158 }, // 5
			{ x: 194, y: 188 }, // 6
			{ x: 150, y: 212 }, // 7
			{ x: 108, y: 242 }, // 8 tail tip
		],
		connections: [[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6],[6,7],[7,8]],
		sizes: [5, 4, 4, 5, 4, 4, 4, 4, 4],
	},
	{
		id: 'phoenix',
		name: 'Phoenix',
		level: 25,
		description: 'Rise from the ashes',
		color: '#EF4444',
		placement: { cx: 0.52, cy: 0.83, scale: 0.20 },
		// Ankaa at top, wings spread, lower body, tail
		stars: [
			{ x: 200, y: 78  }, // 0 Ankaa – body center
			{ x: 98,  y: 142 }, // 1 left wing tip
			{ x: 302, y: 142 }, // 2 right wing tip
			{ x: 155, y: 198 }, // 3 left lower
			{ x: 245, y: 198 }, // 4 right lower
			{ x: 200, y: 252 }, // 5 tail
		],
		connections: [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]],
		sizes: [6, 5, 4, 4, 4, 4],
	},
	{
		id: 'corona',
		name: 'Corona Borealis',
		level: 30,
		description: 'The Northern Crown',
		color: '#F59E0B',
		placement: { cx: 0.50, cy: 0.27, scale: 0.22 },
		// Semicircular arc – Alphecca at the crown peak
		stars: [
			{ x: 200, y: 72  }, // 0 Alphecca – crown peak (brightest)
			{ x: 148, y: 100 }, // 1
			{ x: 110, y: 148 }, // 2
			{ x: 118, y: 208 }, // 3 left end
			{ x: 252, y: 100 }, // 4
			{ x: 290, y: 148 }, // 5
			{ x: 282, y: 208 }, // 6 right end
		],
		connections: [[3,2],[2,1],[1,0],[0,4],[4,5],[5,6]],
		sizes: [6, 5, 4, 4, 5, 4, 4],
	},
];

export default constellationData;
