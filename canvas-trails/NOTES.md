# CANVAS

---

## Create a reatangle

```js
ctx.fillStyle = "white";
ctx.fillRect(20, 20, 100, 100);
```

## Create a circle

```js
ctx.fillStyle = "cyan";
ctx.strokeStyle = "blue";
ctx.lineWidth = 7;
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fill();
ctx.stroke();
```
