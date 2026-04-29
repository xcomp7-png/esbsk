// ========== MAIN.JS (Gabungan & Perbaikan Counter) ==========

// ---------- 1. Fungsi yang bergantung pada jQuery ----------
$(document).ready(function() {
    // Mobile menu toggle
    $('.menu-toggle').click(function() {
        $('nav ul').toggleClass('show');
    });

    // Smooth scroll
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 600);
        }
    });

    // Form kontak via WhatsApp
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val().trim();
        var phone = $('#phone').val().trim();
        var message = $('#message').val().trim();
        if (!name || !phone) {
            $('#formResponse').html('<i class="fas fa-exclamation-circle"></i> Nama dan Nomor WA wajib diisi.');
            return;
        }
        var text = `Halo *Bangun Sarana Kontruksi*%0A%0A`;
        text += `Saya *${encodeURIComponent(name)}* ingin berkonsultasi.%0A`;
        text += `Nomor WhatsApp saya: ${encodeURIComponent(phone)}%0A%0A`;
        text += `*Deskripsi proyek:*%0A${encodeURIComponent(message)}%0A%0A`;
        text += `Terima kasih.`;
        var waNumber = '6281234567890'; // Ganti dengan nomor Anda
        var waUrl = `https://wa.me/${waNumber}?text=${text}`;
        $('#formResponse').html('<i class="fas fa-spinner fa-spin"></i> Mengarahkan ke WhatsApp...');
        window.open(waUrl, '_blank');
        setTimeout(function() {
            $('#formResponse').html('<i class="fas fa-check-circle"></i> Terima kasih! Silakan lanjutkan chat di WhatsApp.');
            $('#contactForm')[0].reset();
        }, 1500);
    });
});

// ---------- 2. Semua event listener dalam DOMContentLoaded ----------
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animasi teks hero (stagger fade-in)
    const heroContent = document.querySelector('.hero .hero-content');
    if (heroContent) {
        const elements = heroContent.children;
        Array.from(elements).forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        function animateStagger(index) {
            if (index >= elements.length) return;
            const el = elements[index];
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                animateStagger(index + 1);
            }, 200 * (index + 1));
        }
        animateStagger(0);
    }

    // Typing text (Typed.js)
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ["Kontraktor Bangunan & Rumah", "Renovasi Rumah Profesional", "Sahabat Bangunan Anda"],
            typeSpeed: 60,
            backSpeed: 30,
            loop: true,
            cursorChar: '|',
            contentType: 'html',
        });
    }

    // Slider proyek dengan Swiper
    const projects = [
        { img: "https://casa-renova.com/wp-content/uploads/2025/11/WhatsApp-Image-2022-06-10-at-2.21.34-PM.jpeg", title: "Desain Rumah Bapak Said", location: "Indramayu, Jabar - 2024" },
        { img: "https://bangunrumahbekon.com/wp-content/uploads/elementor/thumbs/Grey-House-2-Gambar-qbsx8gdi091gnmzt1uww7lyaohay7wbmjoqlq9li6s.jpg", title: "Desain Rumah Bapak Hendro", location: "Kuningan, Jabar - 2024" },
        { img: "https://bangunrumahbekon.com/wp-content/uploads/elementor/thumbs/Desain-Rumah-Bu-Yulia-1-qj972cijzbhajtym77zir72sk9roxlc6htznkwcgsg.jpg", title: "Renovasi Rumah Ibu Yulia", location: "Bandung - 2023" },
        { img: "https://bangunrumahbekon.com/wp-content/uploads/elementor/thumbs/IMG-20250716-WA0011-r969layq7f48fc1ebti2qh0kz2vqudbzfmmiwwtqf0.jpg", title: "Renovasi Rumah Ibu Fatimah", location: "Bandung - 2023" },
        { img: "https://bangunrumahbekon.com/wp-content/uploads/elementor/thumbs/Desain-AC-qj98y6j96wc8erfg3jk9p2ubvbfaf8mttkv4drrnr4.jpg", title: "Renovasi Rumah Bapak Agus", location: "Bandung - 2023" },
        { img: "https://bangunrumahbekon.com/wp-content/uploads/elementor/thumbs/PROJECT-BEKON-1-scaled-rclhz4cps5tdkgmb69l3v98u9hix8w8e5tq7nlhm2k.jpg", title: "Renovasi Rumah Bapak Rahmat", location: "Bandung - 2023" }
    ];
    const wrapper = document.getElementById('project-slider-wrapper');
    if (wrapper) {
        let slidesHtml = '';
        projects.forEach(proj => {
            slidesHtml += `
                <div class="swiper-slide">
                    <div class="project-card">
                        <img src="${proj.img}" alt="${proj.title}">
                        <h3>${proj.title}</h3>
                        <p>${proj.location}</p>
                    </div>
                </div>
            `;
        });
        wrapper.innerHTML = slidesHtml;
        if (typeof Swiper !== 'undefined') {
            new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: { 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } },
            });
        }
    }

    // AOS initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: false, offset: 100 });
    }

    // ========== COUNTER ANIMATION (DIPERBAIKI) ==========
    const counters = document.querySelectorAll('.hero-stats .counter'); // <-- PERBAIKAN: target .hero-stats
    if (counters.length) {
        const animateNumber = (el) => {
            const target = parseInt(el.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60; // kecepatan
            const update = () => {
                current += increment;
                if (current < target) {
                    el.innerText = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.innerText = target;
                }
            };
            update();
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (counter.innerText === '0') animateNumber(counter);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => observer.observe(counter));
    }
});

// ---------- 3. MODAL & KALKULATOR (tidak perlu DOMContentLoaded) ----------
const modal = document.getElementById('modalEstimasi');
const btnEstimasi = document.querySelector('.btn-estimasi');
const closeModal = document.querySelector('.close-modal');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
function closeModalFunc() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
if (btnEstimasi) {
    btnEstimasi.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    });
}
if (closeModal) closeModal.addEventListener('click', closeModalFunc);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModalFunc();
});

// Data harga & fungsi kalkulator (sama seperti sebelumnya)
const priceDB = {
    rumah: {
        standar: { 1: 4000000, 2: 5000000, 3: 5800000, 4: 5800000 },
        premium: { 1: 5500000, 2: 6000000, 3: 6500000, 4: 6850000 },
        luxury:  { 1: 7000000, 2: 8500000, 3: 9500000, 4: 11000000 }
    },
    ruko: { lantai: { 1: 4500000, 2: 4500000, 3: 5500000, 4: 6000000 } },
    gudang: { standar: 2850000, premium: 3500000, luxury: 4000000 },
    renovasi: { ringan: 2850000, sedang: 4000000, total: 6000000 },
    kosan: {
        standar: { 1: 3500000, 2: 4200000, 3: 4800000, 4: 5200000 },
        premium: { 1: 4500000, 2: 5500000, 3: 6200000, 4: 6800000 },
        luxury:  { 1: 5800000, 2: 7000000, 3: 8000000, 4: 9000000 }
    }
};

function updateModalOptions() {
    const jenis = document.getElementById('modalJenisBangunan').value;
    const tipeSelect = document.getElementById('modalTipe');
    const lantaiSelect = document.getElementById('modalLantai');
    const tipeGroup = document.getElementById('modalTipeGroup');
    const lantaiGroup = document.getElementById('modalLantaiGroup');

    tipeSelect.innerHTML = '';
    lantaiSelect.innerHTML = '';

    if (jenis === 'rumah') {
        tipeGroup.style.display = 'block';
        lantaiGroup.style.display = 'block';
        ['standar', 'premium', 'luxury'].forEach(t => {
            let opt = new Option(t.charAt(0).toUpperCase() + t.slice(1), t);
            tipeSelect.appendChild(opt);
        });
        for (let i=1; i<=4; i++) lantaiSelect.appendChild(new Option(`Lantai ${i}`, i));
        lantaiSelect.disabled = false;
        tipeSelect.disabled = false;
    }
    else if (jenis === 'ruko') {
        tipeGroup.style.display = 'none';
        lantaiGroup.style.display = 'block';
        tipeSelect.disabled = true;
        for (let i=1; i<=4; i++) lantaiSelect.appendChild(new Option(`Lantai ${i}`, i));
        lantaiSelect.disabled = false;
    }
    else if (jenis === 'gudang') {
        tipeGroup.style.display = 'block';
        lantaiGroup.style.display = 'none';
        ['standar', 'premium', 'luxury'].forEach(t => {
            let opt = new Option(t.charAt(0).toUpperCase() + t.slice(1), t);
            tipeSelect.appendChild(opt);
        });
        lantaiSelect.disabled = true;
        lantaiSelect.appendChild(new Option('-', ''));
    }
    else if (jenis === 'renovasi') {
        tipeGroup.style.display = 'block';
        lantaiGroup.style.display = 'none';
        ['ringan', 'sedang', 'total'].forEach(t => {
            let opt = new Option(`Renovasi ${t.charAt(0).toUpperCase() + t.slice(1)}`, t);
            tipeSelect.appendChild(opt);
        });
        lantaiSelect.disabled = true;
        lantaiSelect.appendChild(new Option('-', ''));
    }
    else if (jenis === 'kosan') {
        tipeGroup.style.display = 'block';
        lantaiGroup.style.display = 'block';
        ['standar', 'premium', 'luxury'].forEach(t => {
            let opt = new Option(t.charAt(0).toUpperCase() + t.slice(1), t);
            tipeSelect.appendChild(opt);
        });
        for (let i=1; i<=4; i++) lantaiSelect.appendChild(new Option(`Lantai ${i}`, i));
        lantaiSelect.disabled = false;
        tipeSelect.disabled = false;
    }
    document.getElementById('modalResultArea').style.display = 'none';
}

function hitungModalEstimasi() {
    const jenis = document.getElementById('modalJenisBangunan').value;
    const tipe = document.getElementById('modalTipe').value;
    const lantai = parseInt(document.getElementById('modalLantai').value);
    const luas = parseFloat(document.getElementById('modalLuas').value);
    if (isNaN(luas) || luas <= 0) { alert("Luas harus diisi minimal 1 m²"); return; }

    let hargaPerM2 = 0;
    if (jenis === 'rumah') {
        const hargaObj = priceDB.rumah[tipe];
        hargaPerM2 = hargaObj ? hargaObj[lantai] : 0;
    } else if (jenis === 'ruko') {
        hargaPerM2 = priceDB.ruko.lantai[lantai] || 0;
    } else if (jenis === 'gudang') {
        hargaPerM2 = priceDB.gudang[tipe] || 0;
    } else if (jenis === 'renovasi') {
        hargaPerM2 = priceDB.renovasi[tipe] || 0;
    } else if (jenis === 'kosan') {
        const hargaObj = priceDB.kosan[tipe];
        hargaPerM2 = hargaObj ? hargaObj[lantai] : 0;
    }

    if (hargaPerM2 === 0) {
        alert("Kombinasi pilihan tidak tersedia. Silakan pilih opsi lain.");
        return;
    }

    const total = hargaPerM2 * luas;
    const formatter = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 });
    document.getElementById('modalTotalBiaya').innerText = formatter.format(total);

    const jenisText = document.getElementById('modalJenisBangunan').options[document.getElementById('modalJenisBangunan').selectedIndex]?.text;
    const tipeText = tipe ? document.getElementById('modalTipe').options[document.getElementById('modalTipe').selectedIndex]?.text : '-';
    const lantaiText = lantai ? `Lantai ${lantai}` : '-';

    const detailHtml = `
        <li><strong>Jenis Bangunan</strong> <span>${jenisText}</span></li>
        <li><strong>Tipe</strong> <span>${tipeText}</span></li>
        <li><strong>Jumlah Lantai</strong> <span>${lantaiText}</span></li>
        <li><strong>Luas Bangunan</strong> <span>${luas} m²</span></li>
        <li><strong>Harga per m²</strong> <span>${formatter.format(hargaPerM2)}</span></li>
        <li><strong>Estimasi Total</strong> <span>${formatter.format(total)}</span></li>
    `;
    document.getElementById('modalDetailList').innerHTML = detailHtml;
    document.getElementById('modalResultArea').style.display = 'block';

    const message = `Halo *Bangun Sarana Kontruksi*%0A%0ASaya ingin konsultasi terkait estimasi biaya:%0A- Jenis: ${jenisText}%0A- Tipe: ${tipeText}%0A- Lantai: ${lantaiText}%0A- Luas: ${luas} m²%0A- Perkiraan biaya: ${formatter.format(total)}%0A%0ATerima kasih.`;
    document.getElementById('modalWhatsappLink').href = `https://wa.me/6281234567890?text=${message}`;
}

document.getElementById('modalJenisBangunan').addEventListener('change', updateModalOptions);
document.getElementById('modalTipe').addEventListener('change', () => { document.getElementById('modalResultArea').style.display = 'none'; });
document.getElementById('modalLantai').addEventListener('change', () => { document.getElementById('modalResultArea').style.display = 'none'; });
document.getElementById('modalLuas').addEventListener('input', () => { document.getElementById('modalResultArea').style.display = 'none'; });
document.getElementById('modalHitungBtn').addEventListener('click', hitungModalEstimasi);
updateModalOptions();
