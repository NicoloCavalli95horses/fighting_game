export class Sprite {
  constructor({ position, velocity, color, offset, health }) {
    this.position = position;
    this.velocity = velocity;
    this.width = 50;
    this.height = 150;
    this.lastKey;
    this.color = color;
    this.gravity = this.gravity || 0.7;
    this.isAttacking;
    this.health = health;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      offset,
      width: 100,
      height: 50,
    };
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);

    if (this.isAttacking) {
      ctx.fillRect(
        this.attackBox.position.x,
        this.attackBox.position.y,
        this.attackBox.width,
        this.attackBox.height
      );
    }
  }

  update(ctx) {
    this.draw(ctx);
    this.position.y += this.velocity.y;
    this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
    this.attackBox.position.y = this.position.y;

    // Jump
    if (this.position.y + this.height + this.velocity.y >= 720) {
      this.velocity.y = 0;
    } else {
      this.velocity.y += this.gravity;
    }

    // Do not go beyond the screen
    if (
      this.position.x + this.velocity.x >= 0 &&
      this.position.x + this.width + this.velocity.x <= 1080
    ) {
      this.position.x += this.velocity.x;
    } else {
      this.velocity.x = 0;
    }
  }

  attack() {
    this.isAttacking = true;
    setTimeout(() => (this.isAttacking = false), 100);
  }
}
