
  // Nav scroll shadow
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
  });

  // Mobile menu
  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const menuButton = document.getElementById('hamburger');
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  }
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
    document.getElementById('hamburger').setAttribute('aria-label', 'Open navigation menu');
  }));

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('visible'));
  }

  // Filter rooms
  let activeFilter = 'all';
  let selectedType = 'all';
  let maxBudget = Number.POSITIVE_INFINITY;

  function filterRooms(filter, btn) {
    activeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(button => {
      const isActive = button === btn;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });

    const cards = document.querySelectorAll('.room-card');
    let sharedVisible = 0, privateVisible = 0;

    cards.forEach(card => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const type = card.dataset.type || '';
      const price = Number(card.dataset.price);
      let matchesCategory = false;

      if (activeFilter === 'all') {
        matchesCategory = true;
      } else if (activeFilter === 'available') {
        matchesCategory = card.dataset.status === 'available';
      } else if (activeFilter === 'shared' || activeFilter === 'private') {
        matchesCategory = type === activeFilter;
      } else if (activeFilter === 'aircon') {
        matchesCategory = tags.includes('aircon');
      }

      const matchesType = selectedType === 'all' || type === selectedType;
      const matchesBudget = Number.isFinite(price) && price <= maxBudget;
      const show = matchesCategory && matchesType && matchesBudget;

      card.style.display = show ? '' : 'none';
      if (show && type === 'shared') sharedVisible++;
      if (show && type === 'private') privateVisible++;
    });

    document.getElementById('group-shared').style.display = sharedVisible > 0 ? '' : 'none';
    document.getElementById('group-private').style.display = privateVisible > 0 ? '' : 'none';
    document.getElementById('count-shared').textContent = sharedVisible + ' room' + (sharedVisible !== 1 ? 's' : '');
    document.getElementById('count-private').textContent = privateVisible + ' room' + (privateVisible !== 1 ? 's' : '');
    document.getElementById('emptyState').classList.toggle('visible', sharedVisible + privateVisible === 0);
  }

  const searchParams = new URLSearchParams(window.location.search);
  const budgetSelect = document.getElementById('roomBudget');
  const typeSelect = document.getElementById('roomType');
  const requestedBudget = searchParams.get('budget') || '';
  const requestedType = searchParams.get('type') || 'all';
  const parsedBudget = Number(requestedBudget);

  if (requestedBudget && Number.isFinite(parsedBudget) && parsedBudget >= 0) {
    budgetSelect.value = String(parsedBudget);
  }
  if ([...typeSelect.options].some(option => option.value === requestedType)) {
    typeSelect.value = requestedType;
  }

  selectedType = typeSelect.value;
  maxBudget = budgetSelect.value ? Number(budgetSelect.value) : Number.POSITIVE_INFINITY;
  filterRooms('all', document.querySelector('.filter-btn[data-filter="all"]'));
