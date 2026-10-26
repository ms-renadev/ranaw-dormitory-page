# N & S Apartment and Boarding House

A static website for showcasing student accommodation at N & S Apartment and Boarding House in MSU Cadayonan, Marawi City. Visitors can browse shared and private rooms, review property information, and contact the manager directly.

## Live demo

[View the deployed website](https://ns-boardinghouse-msu-marawi.vercel.app/)

## Website features

### Landing page

The home page (`/index.html`) includes:

- A responsive navigation menu and an introduction to the property.
- A featured selection of three shared rooms, with pricing, amenities, and links to inquire.
- An overview of the property and its location, with a link to open the location in Google Maps.
- Tenant testimonials.
- Direct contact options by email, Facebook, and phone.
- A full room-listing link and footer navigation.

### Room catalog

The catalog (`/pages/rooms.html`) lists eight room options:

- Four shared rooms and four private rooms.
- Room photos, capacity, monthly price, descriptions, and amenities.
- Filters for all rooms, available rooms, shared rooms, private rooms, and rooms with air conditioning.
- Availability labels, room counts, and an empty state when no rooms match.
- Direct inquiry links that take visitors to the contact section on the home page.

Room details and availability are stored directly in the page markup. Confirm current prices and availability with the property manager before relying on them.

### Responsive and accessible interactions

- Layouts adapt for desktop, tablet, and mobile screen sizes.
- The mobile navigation button reports its expanded state to assistive technology.
- Scroll-reveal effects respect the user's reduced-motion preference.
- Room filters and menu interactions use the site's JavaScript files.

## Contact and location

- **Location:** MSU Cadayonan, Marawi City, beside the MSU-Meranaw Cultural Heritage Center.
- **Phone:** +63 964 942 0305
- **Email:** renyuhin216@gmail.com
- **Facebook:** [N & S Apartment Boarding House](https://facebook.com/NSApartmentBoardingHouse)

## Project structure

```text
.
├── index.html                 # Landing page
├── index_style.css            # Landing page styles
├── rooms_page_style.css       # Room catalog styles
├── pages/
│   ├── rooms.html             # Room catalog
│   ├── admin_dashboard.html   # Incomplete placeholder
│   └── view_rooms.html        # Empty placeholder
├── scripts/
│   ├── index_script.js        # Landing page navigation and reveal effects
│   └── rooms_script.js        # Catalog navigation, reveal effects, and filters
├── images/                    # Property, room, owner, and testimonial photos
└── assets/                    # Contact and feature icons
```

The admin dashboard and individual room-details page are not implemented.

## Run locally

This project is plain HTML, CSS, and JavaScript; it does not require a build step or package installation. From the project root, start a local web server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/> in a browser. Serve the project from its root directory so the site's root-relative asset and page links resolve correctly.

## Technology

- HTML
- CSS
- Vanilla JavaScript
- DM Sans and Fraunces fonts loaded from Google Fonts
