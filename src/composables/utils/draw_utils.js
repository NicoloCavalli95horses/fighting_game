export function draw(ctx, user, frame, window) {
  // Draw the user
  ctx.fillStyle = user.color;
  ctx.fillRect(user.position.x, user.position.y, user.width, user.height);

  // Apply gravity
  user.position.y += user.velocity.y;

  // Show animations
  if (user.isAttacking) {
    ctx.fillRect(
      user.attackBox.position.x,
      user.attackBox.position.y,
      user.attackBox.width,
      user.attackBox.height
    );
    drawAnimation(ctx, user, user.animation.attack, frame);
  } else if (user.isRunning) {
    drawAnimation(ctx, user, user.animation.run, frame);
  } else if (user.isJumping) {
    drawAnimation(ctx, user, user.animation.jump, frame);
  } else if (user.isFalling) {
    drawAnimation(ctx, user, user.animation.fall, frame);
  } else if (user.isDead) {
    drawAnimation(ctx, user, user.animation.death, frame);
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

  // Check if can jump
  if (user.position.y > 539 && user.position.y < 541) {
    user.canJump = true;
    user.isJumping = false;
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
    switch (e.key) {
      // Left
      case user.keys.left:
        user.velocity.x = -5;
        user.isRunning = true;
        break;
      // Right
      case user.keys.right:
        user.velocity.x = 5;
        user.isRunning = true;
        break;
      // Up
      case user.keys.up:
        if (user.canJump){
          user.velocity.y = -20;
          user.isJumping = true;
        } 
        if (user.isJumping){
          user.canJump = false;
        }
        
        break;
      // Attack
      case user.keys.attack:
        if(!user.isAttacking) attack(user);
        break;
    }
  });

  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      // Left
      case user.keys.left:
        user.isRunning = false;
        user.velocity.x = 0;
        break;
      // Right
      case user.keys.right:
        user.isRunning = false;
        user.velocity.x = 0;
        break;
    }
  });
}

export function setDirection(player, enemy) {
  // players always have to look at each other
  player.position.x >= enemy.position.x
    ? player.attackBox.offset = -130
    : player.attackBox.offset = 0;
  
  enemy.position.x >= player.position.x 
    ? enemy.attackBox.offset = -130
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
    setTimeout(() => {
      user.isAttacking = false;
    }, 500);
}

function handleAttackBox(user) {
  user.attackBox.position.x = user.position.x + user.attackBox.offset;
  user.attackBox.position.y = user.position.y;
}

//===================================================
// ANIMATIONS
// ==================================================


// ====================  SHOP =======================

const shop = new Image();  // Create shop image()
shop.src = 'src/assets/img/decorations/shop.png';
let SHOP_WIDTH = 708;
let SHOP_HEIGHT = 128;
let TOTAL_SHOP_FRAME = 6
let i = 1;

export function drawShop(ctx, frame){
  ctx.drawImage(
    shop, 
    i * ( SHOP_WIDTH / TOTAL_SHOP_FRAME ),  // Cropping X (each iteration, scroll horizontally by an image frame)
    0,                                      // Cropping Y (remain the same)
    SHOP_WIDTH / TOTAL_SHOP_FRAME,
    SHOP_HEIGHT,
    1100,                                   // X position on the canvas of the whole image
    300,                                    // Y position on the canvas of the whole image
    SHOP_WIDTH / TOTAL_SHOP_FRAME * 3,      // WIDTH of the whole image
    SHOP_HEIGHT * 3                         // HEIGHT of the whole image
  );

  if( frame % 15 === 0 ) {                  // Every 10 ctx frame, perform an iteration ( i + 1)
    i = (i == (TOTAL_SHOP_FRAME - 1))       // Restart the iteration if i > TOTAL_SHOP_FRAME
      ? 1 
      : i + 1
  }
}


// ================== BACKGROUND ====================

const background = new Image();  // Create background image()
background.src = 'src/assets/img/background/background.png';

export function drawBackground(ctx, window){
  ctx.drawImage(background, 0, 0, window.width, window.height);
}

// =================== ANIMATION =====================
 
function drawAnimation(ctx, user, animation, frame){
  animation.image.src = animation.src;

  ctx.drawImage(
    animation.image, 
    animation.i * ( animation.width / animation.total ),
    0,                                      
    animation.width / animation.total,
    animation.height,
    user.position.x - 275,             
    user.position.y - 220,
    animation.width / animation.total * 3,
    animation.height * 3
  );

  if( frame % 20 === 0 ) {                
    animation.i = (animation.i == (animation.total - 1))    
      ? 1 
      : animation.i + 1
  }
}