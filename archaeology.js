document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const archaeologyTabs = document.querySelectorAll('.archaeology-tab');
    const archaeologyContents = document.querySelectorAll('.archaeology-content');

    archaeologyTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            archaeologyTabs.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const tabId = this.dataset.tab;
            archaeologyContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Timeline navigation functionality (if timeline elements exist)
    const yearSelect = document.getElementById('year-select');
    const prevYearBtn = document.getElementById('prev-year');
    const nextYearBtn = document.getElementById('next-year');
    
    if (prevYearBtn && nextYearBtn && yearSelect) {
        prevYearBtn.addEventListener('click', function() {
            const currentIndex = yearSelect.selectedIndex;
            if (currentIndex > 0) {
                yearSelect.selectedIndex = currentIndex - 1;
                // Here you would typically trigger an event to update the timeline display
            }
        });
        
        nextYearBtn.addEventListener('click', function() {
            const currentIndex = yearSelect.selectedIndex;
            if (currentIndex < yearSelect.options.length - 1) {
                yearSelect.selectedIndex = currentIndex + 1;
                // Here you would typically trigger an event to update the timeline display
            }
        });
    }

    // Form submission handlers
    const archiveForm = document.getElementById('archive-form');
    const interviewForm = document.getElementById('interview-form');

    if (archiveForm) {
        archiveForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleArchiveSubmission();
        });
    }

    if (interviewForm) {
        interviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleInterviewSubmission();
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const archiveModal = document.getElementById('add-archive-modal');
        const interviewModal = document.getElementById('add-interview-modal');
        
        if (event.target === archiveModal) {
            closeModal('add-archive-modal');
        }
        if (event.target === interviewModal) {
            closeModal('add-interview-modal');
        }
    });
});

// Modal functions
function openAddModal(type) {
    if (type === 'archive') {
        document.getElementById('add-archive-modal').style.display = 'block';
    } else if (type === 'interview') {
        document.getElementById('add-interview-modal').style.display = 'block';
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Form submission handlers
function handleArchiveSubmission() {
    const form = document.getElementById('archive-form');
    const formData = new FormData(form);
    
    // Get form values
    const title = formData.get('title');
    const description = formData.get('description');
    const link = formData.get('link');
    const imageFile = formData.get('image');
    
    // Validate required fields
    if (!title || !description) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create new archive item
    const archiveGrid = document.querySelector('.archive-grid');
    const newItem = document.createElement('div');
    newItem.className = 'archive-item';
    
    // Handle image preview
    let imageSrc = 'placeholder-new-design.jpg';
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newItem.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }
    
    newItem.innerHTML = `
        <img src="${imageSrc}" alt="${title}">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link || '#'}" class="view-details">View Details</a>
    `;
    
    archiveGrid.appendChild(newItem);
    
    // Reset form and close modal
    form.reset();
    closeModal('add-archive-modal');
    
    alert('Archive item added successfully!');
}

function handleInterviewSubmission() {
    const form = document.getElementById('interview-form');
    const formData = new FormData(form);
    
    // Get form values
    const title = formData.get('title');
    const designer = formData.get('designer');
    const description = formData.get('description');
    const link = formData.get('link');
    const type = formData.get('type');
    const imageFile = formData.get('image');
    
    // Validate required fields
    if (!title || !designer || !description || !link) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Create new interview item
    const interviewGrid = document.querySelector('.interview-grid');
    const newItem = document.createElement('div');
    newItem.className = 'interview-item';
    
    // Handle image preview
    let imageSrc = 'placeholder-designer.jpg';
    if (imageFile && imageFile.size > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            newItem.querySelector('img').src = e.target.result;
        };
        reader.readAsDataURL(imageFile);
    }
    
    const buttonText = type === 'video' ? 'Watch Interview' : 
                      type === 'audio' ? 'Listen to Interview' : 'Read Interview';
    
    newItem.innerHTML = `
        <img src="${imageSrc}" alt="${designer}">
        <h3>${title}</h3>
        <p>${description}</p>
        <a href="${link}" class="watch-btn">${buttonText}</a>
    `;
    
    interviewGrid.appendChild(newItem);
    
    // Reset form and close modal
    form.reset();
    closeModal('add-interview-modal');
    
    alert('Interview added successfully!');
}

// Utility functions for future enhancements
function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Future enhancement: Save to local storage or send to server
function saveArchiveData(data) {
    // This function could be enhanced to save data to a backend
    console.log('Archive data to save:', data);
}

function saveInterviewData(data) {
    // This function could be enhanced to save data to a backend
    console.log('Interview data to save:', data);
}