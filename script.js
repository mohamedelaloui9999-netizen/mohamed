document.addEventListener('DOMContentLoaded', () => {
    
    // 1. نظام التلاشي (Fade Animations Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // يقوم بتشغيل الحركة عندما يظهر 15% من العنصر
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // يضيف class اسمه 'visible' لتشغيل الـ CSS
                entry.target.classList.add('visible');
            } else {
                // يزيل class إذا أردت أن تعود لحالة التلاشي عند الصعود
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // نختار جميع العناصر التي ستحصل على تأثير التلاشي
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up');
    animatedElements.forEach(el => observer.observe(el));


    // 2. خلفية النجوم الفضائية التفاعلية (Starfield Background)
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];

    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initStars();
    }

    window.addEventListener('resize', resizeCanvas);

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // ألوان فضائية: أخضر نيون، بنفسجي، أبيض
            const colors = ['#39ff14', '#b026ff', '#ffffff'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.size = Math.random() * 2;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random();
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // عندما تخرج النجمة من الشاشة تعود من الجهة الأخرى
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;

            // تأثير الوميض
            this.opacity += (Math.random() - 0.5) * 0.1;
            if (this.opacity < 0.2) this.opacity = 0.2;
            if (this.opacity > 1) this.opacity = 1;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initStars() {
        stars = [];
        // عدد النجوم يتناسب مع حجم الشاشة
        const numStars = Math.floor((width * height) / 3000); 
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        ctx.clearRect(0, 0, width, height); // مسح الحركة السابقة
        stars.forEach(star => {
            star.update();
            star.draw();
        });
        requestAnimationFrame(animateStars);
    }

    // تشغيل خلفية النجوم
    resizeCanvas();
    animateStars();
});
