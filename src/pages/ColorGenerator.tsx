import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Palette, Copy, CheckCircle2, RefreshCw } from 'lucide-react';

const generateRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
};

export default function ColorGenerator() {
    const [colors, setColors] = useState<string[]>([]);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const generatePalette = () => {
        const newColors = Array.from({ length: 5 }, generateRandomHex);
        setColors(newColors);
        setCopiedIndex(null);
    };

    useEffect(() => {
        generatePalette();
    }, []);

    const copyColor = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <Palette className="w-6 h-6 text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Color Generator</h1>
                        <p className="text-gray-400 text-sm">Generate beautiful random color palettes</p>
                    </div>
                </div>
                <Button onClick={generatePalette} className="flex items-center space-x-2">
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate New Palette</span>
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 min-h-[50vh] rounded-2xl overflow-hidden shadow-2xl shadow-pink-500/10 transition-all duration-500">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="group relative flex-1 flex flex-col items-center justify-end p-6 min-h-[120px] lg:min-h-full cursor-pointer transition-all duration-300 hover:flex-[1.5]"
                        style={{ backgroundColor: color }}
                        onClick={() => copyColor(color, index)}
                    >
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                        <div className={`p-3 rounded-lg backdrop-blur-md bg-black/20 text-white font-mono text-lg font-bold shadow-lg transform transition-all duration-300 group-hover:-translate-y-4 group-hover:scale-110 flex items-center space-x-2 border border-white/10 ${copiedIndex === index ? 'bg-white/20' : ''}`}>
                            {copiedIndex === index ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span>Copied</span>
                                </>
                            ) : (
                                <>
                                    <span>{color}</span>
                                    <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {colors.map((color, index) => (
                    <Card key={`card-${index}`} className="p-4 flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full border border-white/20 shadow-inner" style={{ backgroundColor: color }}></div>
                        <span className="font-mono text-sm text-gray-300">{color}</span>
                    </Card>
                ))}
            </div>
        </div>
    );
}
