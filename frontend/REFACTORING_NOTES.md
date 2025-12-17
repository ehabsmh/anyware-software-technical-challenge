# Navbar

### Problems

1. Navbar component is doing too many things (layout + responsive + routing logic).
2. Drawer and fixed navbar share the same content but rendered in two different places.
3. Responsive logic mixed directly inside JSX, making it harder to read.
4. Hard to control spacing and styling consistency between main and sub items.

### Decisions

1. Extract shared navbar content into a single reusable component.
2. Keep Navbar responsible only for layout (Drawer vs Fixed).
3. Move spacing and styling decisions to NavbarList, not Navbar.

### Changes

2. Simplified conditional rendering for mobile vs desktop.
3. Centralized spacing control inside MUI `List` instead of random margins.
4. Cleaned JSX and removed unnecessary fragments.

### Result

- Cleaner Navbar component.
- No duplicated markup.
- Easier to adjust spacing and styles.
- Better separation of responsibilities.
