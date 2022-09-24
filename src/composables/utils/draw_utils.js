export function draw(ctx, user, frame, window) {

  // Apply gravity
  user.position.y += user.velocity.y;

  // Show animations
  if (user.state == "attacking") {
    // ctx.fillRect(
    //   user.attackBox.position.x,
    //   user.attackBox.position.y,
    //   user.attackBox.width,
    //   user.attackBox.height
    // );
    drawAnimation(ctx, user, user.animation.attack, frame, 10, true);
  } else if (user.state == "running") {
    drawAnimation(ctx, user, user.animation.run, frame);
  } else if (user.state == "jumping") {
    drawAnimation(ctx, user, user.animation.jump, frame);
  } else if (user.state == "falling") {
    drawAnimation(ctx, user, user.animation.fall, frame);
  } else if (user.state == "dead") {
    drawOneTimeAnimation(ctx, user, user.animation.death, frame);
  } else if (user.state == "hit") {
    drawAnimation(ctx, user, user.animation.hit, frame, 20, true);
  } else {
    drawAnimation(ctx, user, user.animation.idle, frame);
  }

  // Handle attackBox position while user is moving
  handleAttackBox(user);

  // Handle jumping behaviour
  if (user.position.y + user.height + user.velocity.y >= 690) {
    user.velocity.y = 0;
  } else {
    user.velocity.y += user.gravity;
  }

  // Switch between animations
  if (user.velocity.y < 0) {
    user.state = "jumping";
  } else if (user.velocity.y > 0) {
    user.state = "falling";
  } else if (user.health <= 0) {
    user.state = "dead";
  } else if (
    user.state != "running" &&
    user.state != "attacking" &&
    user.state != "hit"
  ) {
    user.state = "idle";
  }

  // Do not go beyond the screen
  if (
    user.position.x + user.velocity.x >= 0 &&
    user.position.x + user.width + user.velocity.x <= window.width
  ) {
    user.position.x += user.velocity.x;
  } else {
    user.velocity.x = 0;
  }
}

export function handleKeyboardEvents(user) {
  window.addEventListener("keydown", (e) => {
    if (user.isDead){
      return
    }
    if (e.key !== user.lastKey) user.lastKey = e.key;

    switch (user.lastKey) {
      // Left
      case user.keys.left:
        if (user.state !== "attacking") {
          user.velocity.x = -5;
          user.state = "running";
        }
        break;
      // Right
      case user.keys.right:
        if (user.state !== "attacking") {
          user.velocity.x = 5;
          user.state = "running";
        }
        break;
      // Up
      case user.keys.up:
        if (user.position.y > window.innerHeight / 2) user.velocity.y = -20;
        break;
      // Attack
      case user.keys.attack:
        if (user.state !== "running") {
          user.state = "attacking";
        }
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    if (user.isDead) {
      return;
    }
    if (e.key !== user.lastKey) user.lastKey = e.key;
    switch (user.lastKey) {
      // Left
      case user.keys.left:
        user.state = "idle";
        user.velocity.x = 0;
        break;
      // Right
      case user.keys.right:
        user.state = "idle";
        user.velocity.x = 0;
        break;
    }
  });
}

export function setDirection(player, enemy) {
  // players always have to look at each other
  if (player.position.x >= enemy.position.x) {
    player.attackBox.offset = -200;
    player.mirror = true;
  } else {
    player.attackBox.offset = 0;
    player.mirror = false;
  }

  if (enemy.position.x >= player.position.x) {
    enemy.attackBox.offset = -200;
    enemy.mirror = false;
  } else {
    enemy.attackBox.offset = 0;
    enemy.mirror = true;
  }
}

export function detectCollision(player, enemy) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.state == "attacking"
  );
}

function handleAttackBox(user) {
  user.attackBox.position.x = user.position.x + user.attackBox.offset;
  user.attackBox.position.y = user.position.y;
}

//===================================================
// ANIMATIONS
// ==================================================

// ====================  SHOP =======================

const shop = new Image(); // Create shop image()
shop.src = "src/assets/img/decorations/shop.png";
let SHOP_WIDTH = 708;
let SHOP_HEIGHT = 128;
let TOTAL_SHOP_FRAME = 6;
let i = 1;

export function drawShop(ctx, frame) {
  ctx.drawImage(
    shop,
    i * (SHOP_WIDTH / TOTAL_SHOP_FRAME), // Cropping X (each iteration, scroll horizontally by an image frame)
    0, // Cropping Y (remain the same)
    SHOP_WIDTH / TOTAL_SHOP_FRAME,
    SHOP_HEIGHT,
    1100, // X position on the canvas of the whole image
    235, // Y position on the canvas of the whole image
    (SHOP_WIDTH / TOTAL_SHOP_FRAME) * 3.6, // WIDTH of the whole image
    SHOP_HEIGHT * 3.6 // HEIGHT of the whole image
  );

  if (frame % 15 === 0) {
    // Every 10 ctx frame, perform an iteration ( i + 1)
    i =
      i == TOTAL_SHOP_FRAME - 1 // Restart the iteration if i > TOTAL_SHOP_FRAME
        ? 1
        : i + 1;
  }
}

// ================== BACKGROUND ====================

const background = new Image(); // Create background image()
background.src = "src/assets/img/background/background.png";

export function drawBackground(ctx, window) {
  ctx.drawImage(background, 0, 0, window.width, window.height);
}

// =================== ANIMATION =====================

function drawAnimation(
  ctx,
  user,
  animation,
  frame,
  speed = 15,
  one_animation_then_idle = false
) {
  animation.image.src = user.mirror
    ? animation.src + "_rev.png"
    : animation.src + ".png";

  ctx.drawImage(
    animation.image,
    animation.i * (animation.width / animation.total),
    0,
    animation.width / animation.total,
    animation.height,
    user.position.x - 330,
    user.position.y - 255,
    (animation.width / animation.total) * 3.5,
    animation.height * 3.5
  );

  if (frame % speed === 0) {
    if (!one_animation_then_idle) {
      animation.i = animation.i == animation.total - 1 ? 1 : animation.i + 1;
    } else {
      if (animation.i == animation.total - 1) {
        animation.i = 1;
        user.state = "idle";
        user.canAttack = true;
        return;
      } else {
        animation.i = animation.i + 1;
        user.canAttack = false;
      }
    }
  }
}


function drawOneTimeAnimation(
  ctx,
  user,
  animation,
  frame,
  speed = 15,
) {
  animation.image.src = animation.src + ".png";

  ctx.drawImage(
    animation.image,
    animation.i * (animation.width / animation.total),
    0,
    animation.width / animation.total,
    animation.height,
    user.position.x - 330,
    user.position.y - 255,
    (animation.width / animation.total) * 3.5,
    animation.height * 3.5
  );

  if (frame % speed === 0) {
    if (animation.i == animation.total - 1) {
      return;
    } else {
      animation.i = animation.i + 1;
    }
  }
}