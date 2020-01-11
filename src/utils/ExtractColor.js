export default function ExtractColor(colorData) {
    const [r, g, b, op] = colorData;
    return `rgba(${r}, ${g}, ${b}, ${op})`;
}