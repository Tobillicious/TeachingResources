# PWA Icons Required for Te Kete Ako

## Icon Specifications

The following icon files are required for complete PWA functionality. All icons should feature the Te Kete Ako logo with appropriate cultural design elements.

### Required Icons:
- `icon-72x72.png` (72x72px) - Small app icon
- `icon-96x96.png` (96x96px) - Standard app icon  
- `icon-128x128.png` (128x128px) - Medium app icon
- `icon-144x144.png` (144x144px) - High-res app icon
- `icon-152x152.png` (152x152px) - Apple touch icon
- `icon-192x192.png` (192x192px) - Standard PWA icon
- `icon-384x384.png` (384x384px) - Large app icon
- `icon-512x512.png` (512x512px) - Extra large app icon

### Additional Icons for Shortcuts:
- `search-icon.png` (96x96px) - Search functionality
- `handout-icon.png` (96x96px) - Handouts section
- `unit-icon.png` (96x96px) - Unit plans section  
- `experience-icon.png` (96x96px) - Learning experiences

### Notification Icons:
- `badge-72x72.png` (72x72px) - Notification badge
- `checkmark.png` (96x96px) - Success actions
- `xmark.png` (96x96px) - Dismiss actions

## Design Guidelines

### Color Scheme:
- Primary: #2C5F41 (Deep forest green)
- Secondary: #B8860B (Gold)
- Accent: #40E0D0 (Turquoise)
- Background: #fafbfc (Light background)

### Design Elements:
- Te Kete Ako logo/text
- Cultural patterns (subtle koru or traditional designs)
- Educational imagery (books, learning elements)
- Clean, modern aesthetic suitable for both light and dark themes

### Technical Requirements:
- All icons must be PNG format
- Square aspect ratio (1:1)
- High contrast for visibility
- Optimized file size for web delivery
- Maskable design (safe area considerations for different platforms)

## Implementation Status
✅ manifest.json configured with icon references
✅ PWA registration script created
✅ Service worker caching implemented
⏳ Icons need to be created/provided

## Next Steps
1. Create or source the required icon files
2. Place them in the `/icons/` directory
3. Test PWA installation across different devices
4. Validate icon display in various contexts

## Testing Checklist
- [ ] Icons display correctly in app drawer/home screen
- [ ] Install banner appears appropriately  
- [ ] Offline functionality works as expected
- [ ] Icon quality is maintained across all sizes
- [ ] Cultural design elements are preserved at small sizes