export function draw(ctx, user) {
  // Draw the user
  ctx.fillStyle = user.color;
  ctx.fillRect(user.position.x, user.position.y, user.width, user.height);

  // Apply gravity
  user.position.y += user.velocity.y;

  // Show the attackbox if the user is attacking
  if (user.isAttacking) {
    ctx.fillRect(
      user.attackBox.position.x,
      user.attackBox.position.y,
      user.attackBox.width,
      user.attackBox.height
    );
  }

  // Handle attackBox position while user is moving
  handleAttackBox(user);

  // Handle jumping behaviour
  if (user.position.y + user.height + user.velocity.y >= 510) {
    user.velocity.y = 0;
  } else {
    user.velocity.y += user.gravity;
  }

  // Do not go beyond the screen
  if (
    user.position.x + user.velocity.x >= 0 &&
    user.position.x + user.width + user.velocity.x <= 1080
  ) {
    user.position.x += user.velocity.x;
  } else {
    user.velocity.x = 0;
  }
}

export function handleKeyboardEvents(user) {
  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      // Left
      case user.keys.left:
        user.velocity.x = -5;
        break;
      // Right
      case user.keys.right:
        user.velocity.x = 5;
        break;
      // Up
      case user.keys.up:
        user.position.y > 355 && user.position.y < 365
          ? (user.velocity.y = -20)
          : (user.velocity.y += user.gravity);
        break;
      // Attack
      case user.keys.attack:
        attack(user);
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      // Left
      case user.keys.left:
        user.velocity.x = 0;
        break;
      // Right
      case user.keys.right:
        user.velocity.x = 0;
        break;
    }
  });
}

export function setDirection(player, enemy) {
  // players always have to look at each other
  player.position.x >= enemy.position.x
    ? player.attackBox.offset = -50
    : player.attackBox.offset = 0;
  
  enemy.position.x >= player.position.x 
    ? enemy.attackBox.offset = -50
    : enemy.attackBox.offset = 0;
}

export function detectCollision(player, enemy) {
  return (
    player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height &&
    player.isAttacking
  );
}

function attack(user) {
  user.isAttacking = true;
  setTimeout(() => (user.isAttacking = false), 100);
}

function handleAttackBox(user) {
  user.attackBox.position.x = user.position.x + user.attackBox.offset;
  user.attackBox.position.y = user.position.y;
}