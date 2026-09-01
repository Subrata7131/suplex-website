
gsap.to("#marqueeScroller", {
    x: "-50%",
    ease: 'none',
    duration: 12,
    repeat: -1

});


const tagLine = new SplitText("#tagLine", {
    type: "words,chars"
});

gsap.from(tagLine.chars, {
    opacity: 0.15,
    stagger: 0.3,
    scrollTrigger: {
        scroller: "main",
        start: "270% 70%",
        end: "270% 30%",
        scrub: true,
        //markers: true
    }
});

const brandMessage = new SplitText("#brandmsg", { type: "words, chars" });

gsap.from(brandMessage.chars, {
    opacity: 0.15,
    stagger: 0.3,
    scrollTrigger: {
        // markers: true,
        scroller: "main",
        start: "330% 80%",
        end: "330% 60%",
        scrub: true
    }
});


const imagePaths = [
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png1.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png2.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png3.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png4.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png5.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png6.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png7.png',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png8.jpeg',
    'https://ik.imagekit.io/crxujbzvm/Suplex%20website/ui/png9.jpeg',
    
];



const images = [];
let imagesLoaded = 0;

// Load them all before animating
imagePaths.forEach((src, index) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        imagesLoaded++;
        if (imagesLoaded === imagePaths.length) {
            // startAnimation(); // Start only when all 48 are ready
            resizeCanvas();
            drawFrame(0); // Draw the very first frame immediately
            setupScrollAnimation(); // Set up the GSAP scroll logic
            console.log('ready and bound to scroll');
        }
    };
    images[index] = img;
});




const canvas = document.getElementById('sequenceCanvas');
const ctx = canvas.getContext('2d');

// }
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;

    drawFrame(currentFrameIndex);
}

window.addEventListener('resize', resizeCanvas);


function drawFrame(index) {
    if (!images[index]) return;
    const img = images[index];

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = Math.max(
        canvas.width / img.width,
        canvas.height / img.height
    );

    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;

    const x = (canvas.width - scaledWidth) / 2;
    const y = (canvas.height - scaledHeight) / 2;
    ctx.drawImage(img, x, y, scaledWidth, scaledHeight);
}

let currentFrameIndex = 0;

function setupScrollAnimation() {
    // 1. Create a dummy object to hold our frame value
    const playhead = { frame: 0 };

    // 2. Animate that frame value from 0 to 47
    gsap.to(playhead, {
        frame: images.length - 1,
        snap: "frame", // Forces the number to round to whole integers
        ease: "none",  // Linear progression
        scrollTrigger: {
            trigger: "#landing_sec", // The section holding your canvas
            scroller: "main", // Required because your <main> tag handles the scrolling
            start: "top top", // Starts when the top of the section hits the top of the viewport
            end: `+=${window.innerHeight * 1.7}`, // The user must scroll 3000px to finish the animation
            scrub: 0.5, // Adds a 0.5 second smoothing effect to the scroll
            pin: true, // Pins the canvas in place until the animation finishes
        },
        onUpdate: () => {
            // 3. Every time the scroll changes the frame number, redraw the canvas
            drawFrame(playhead.frame);
        }
    });
}
