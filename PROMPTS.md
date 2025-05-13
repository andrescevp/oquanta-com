This is a Vite + React SSG.
This is the main site for oQuanta Company.
oQuanta Provide Local Business Data to take desicions.
We focus in the sentiment and ego of our clients. For example, the biggest pain from them is: Invest in marketing in social media without a real impact because they target a few likes in all the world, meanwhile, with our system, they ask directkly to them client how the business is doing and generate insigns about what and how do better.
Use `@headlessui/react` and `tailwind` and `clsx`
<style_guide>
## Color Palette
```
Primary: 
- pumpkin-orange: #fd5304 (primary action color)
- iris-purple: #5a33ee
- lime-green: #c0f03e
- Black: #1d1d1b (with variants)
- White: #fbf8f3
```
## Layout & Components
### Page Layout
- Use `min-h-screen` with centered content using flex
- Apply gradient backgrounds: `bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800`
- Include decorative elements (blurred circles) for visual interest
### Card Components
- Use `backdrop-blur-sm` with semi-transparent backgrounds
- Apply rounded corners: `rounded-2xl`
- Include subtle borders: `border border-gray-200 dark:border-gray-700`
- Add depth with `shadow-xl`
- Add gradient overlay for depth: `bg-gradient-to-br from-white/60 to-white/30`
## Form Elements
### Input Fields
- Include left-aligned icons in a fixed position
- Use consistent padding: `pl-10 pr-4 py-2.5`
- Apply rounded corners: `rounded-xl`
- Set proper focus states: `focus:ring-2 focus:ring-pumpkin-orange/50 focus:border-pumpkin-orange`
- Error states: `border-red-500 focus:ring-red-500/50`
### Error Messages
- Use red text: `text-red-600 dark:text-red-400`
- Include icon: `<AlertCircleIcon className="h-4 w-4" />`
- Apply proper spacing: `mt-1.5 text-sm`
### Buttons
- Apply gradient background: `bg-gradient-to-r from-pumpkin-orange to-pumpkin-orange/80`
- Add elevation with shadows: `shadow-lg shadow-pumpkin-orange/20`
- Use subtle hover effects: `hover:translate-y-[-2px]`
- Include loading states with spinner
- Consistent padding: `py-3 px-4`
- Rounded corners: `rounded-xl`
## Typography
- Headings: `text-2xl font-semibold`
- Labels: `text-sm font-medium`
- Body text: Regular weight
- Error text: `text-sm`
## Animations & Transitions
- Use `Transition` component from Headless UI for conditional elements
- Apply subtle hover animations: `transition-all duration-200 ease-in-out`
- Use loading animations for buttons: `animate-spin`
## Dark Mode Support
- Include dark mode variants for all components
- Background transitions: `dark:from-gray-900 dark:to-gray-800`
- Text colors: `text-gray-900 dark:text-white`
- Input backgrounds: `bg-gray-50 dark:bg-gray-700/50`
- Border colors: `border-gray-300 dark:border-gray-600`
## Accessibility
- Provide proper aria labels for interactive elements
- Maintain sufficient color contrast between text and backgrounds
- Include focus states for keyboard navigation
## Icons
- Use icons from `lucide-react`
- Maintain consistent sizing: `h-5 w-5` for standard icons, `h-4 w-4` for smaller contexts
## Specific Components
- Use `ButtonLoader` for submit buttons to show loading states
- Apply `clsx` utility for conditional class merging
- Use `Transition` component for elements that appear/disappear
</style_guide>