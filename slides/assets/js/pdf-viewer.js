// PDF Viewer JavaScript - assisted by Cursor AI

(function() {
  'use strict';

  // Initialize PDF viewer when DOM is ready
  function initPdfViewer() {
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'pdf-modal';
    modal.id = 'pdf-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'pdf-modal-content';
    
    const img = document.createElement('img');
    img.id = 'pdf-modal-image';
    
    const zoomControls = document.createElement('div');
    zoomControls.className = 'pdf-zoom-controls';
    zoomControls.innerHTML = `
      <button class="pdf-zoom-btn" id="pdf-zoom-in" title="Zoom In">+</button>
      <button class="pdf-zoom-btn" id="pdf-zoom-out" title="Zoom Out">−</button>
      <button class="pdf-zoom-btn" id="pdf-zoom-reset" title="Reset Zoom">⌂</button>
      <button class="pdf-zoom-btn pdf-close-btn" id="pdf-close" title="Close">×</button>
    `;
    
    modalContent.appendChild(img);
    modal.appendChild(modalContent);
    modal.appendChild(zoomControls);
    document.body.appendChild(modal);
    
    let currentZoom = 1;
    const minZoom = 0.5;
    const maxZoom = 5;
    const zoomStep = 0.25;
    
    // Get elements
    const modalEl = document.getElementById('pdf-modal');
    const modalImage = document.getElementById('pdf-modal-image');
    const zoomInBtn = document.getElementById('pdf-zoom-in');
    const zoomOutBtn = document.getElementById('pdf-zoom-out');
    const zoomResetBtn = document.getElementById('pdf-zoom-reset');
    const closeBtn = document.getElementById('pdf-close');
    
    // Function to update zoom
    function updateZoom(zoom) {
      currentZoom = Math.max(minZoom, Math.min(maxZoom, zoom));
      modalImage.style.transform = `scale(${currentZoom})`;
      modalImage.style.transformOrigin = 'center center';
    }
    
    // Function to open modal
    function openModal(imageSrc) {
      modalImage.src = imageSrc;
      currentZoom = 1;
      updateZoom(1);
      modalEl.classList.add('active');
      document.body.classList.add('pdf-modal-open');
      
      // Prevent reveal.js navigation
      if (window.Reveal) {
        window.Reveal.configure({ keyboard: false });
      }
    }
    
    // Function to close modal
    function closeModal() {
      modalEl.classList.remove('active');
      document.body.classList.remove('pdf-modal-open');
      
      // Re-enable reveal.js navigation
      if (window.Reveal) {
        window.Reveal.configure({ keyboard: true });
      }
    }
    
    // Event listeners for buttons
    zoomInBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      updateZoom(currentZoom + zoomStep);
    });
    
    zoomOutBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      updateZoom(currentZoom - zoomStep);
    });
    
    zoomResetBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      updateZoom(1);
    });
    
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeModal();
    });
    
    // Close on backdrop click
    modalEl.addEventListener('click', function(e) {
      if (e.target === modalEl) {
        closeModal();
      }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalEl.classList.contains('active')) {
        closeModal();
      }
    });
    
    // Mouse wheel zoom
    modalContent.addEventListener('wheel', function(e) {
      if (modalEl.classList.contains('active')) {
        e.preventDefault();
        e.stopPropagation();
        
        const delta = e.deltaY > 0 ? -zoomStep : zoomStep;
        updateZoom(currentZoom + delta);
      }
    }, { passive: false });
    
    // Pinch zoom for touch devices
    let lastTouchDistance = 0;
    modalContent.addEventListener('touchstart', function(e) {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        lastTouchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
      }
    });
    
    modalContent.addEventListener('touchmove', function(e) {
      if (e.touches.length === 2) {
        e.preventDefault();
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        if (lastTouchDistance > 0) {
          const scale = currentDistance / lastTouchDistance;
          updateZoom(currentZoom * scale);
        }
        
        lastTouchDistance = currentDistance;
      }
    }, { passive: false });
    
    // Attach click handlers to all PDF thumbnails
    const pdfThumbnails = document.querySelectorAll('.pdf-thumbnail');
    pdfThumbnails.forEach(function(thumbnail) {
      thumbnail.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(this.src);
      });
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPdfViewer);
  } else {
    initPdfViewer();
  }
  
  // Also initialize after reveal.js loads (if using reveal.js)
  if (window.Reveal) {
    window.Reveal.addEventListener('ready', function() {
      // Re-initialize to catch dynamically loaded content
      setTimeout(initPdfViewer, 100);
    });
  }
})();

