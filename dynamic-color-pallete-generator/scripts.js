const { createApp } = Vue;

createApp({
  data() {
    return {
      keyword: "",
      palette: [],
      gradients: []
    };
  },
  methods: {
    generatePalette() {
      const input = this.keyword.trim().toLowerCase();
      if (!input) return;

      // If user enters a valid color (hex or named)
      if (this.isColor(input)) {
        this.palette = this.generateFromColor(input);
      } else {
        this.createPalette(input); // fallback to keyword generator
      }

      this.gradients = [
        `linear-gradient(45deg, ${this.palette[0]}, ${this.palette[1]})`,
        `linear-gradient(90deg, ${this.palette[2]}, ${this.palette[3]})`
      ];
    },

    randomizePalette() {
      const randomColor = () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0");

      this.palette = Array.from({ length: 5 }, randomColor);
      this.gradients = [
        `linear-gradient(45deg, ${this.palette[0]}, ${this.palette[1]})`,
        `linear-gradient(90deg, ${this.palette[2]}, ${this.palette[3]})`
      ];
    },

    createPalette(keyword) {
      const base = keyword.length * 123456;
      const randomColor = (offset) =>
        "#" + ((base + offset) % 0xffffff).toString(16).padStart(6, "0");

      this.palette = [
        randomColor(111),
        randomColor(333),
        randomColor(555),
        randomColor(777),
        randomColor(999)
      ];
    },

    isColor(input) {
      const s = new Option().style;
      s.color = input;
      return s.color !== ""; // detects named colors like "blue"
    },

    hexToHSL(hex) {
      hex = hex.replace(/^#/, "");
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((x) => x + x)
          .join("");
      }
      const num = parseInt(hex, 16);
      const r = (num >> 16) / 255;
      const g = ((num >> 8) & 255) / 255;
      const b = (num & 255) / 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;
      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return [h * 360, s * 100, l * 100];
    },

    hslToHex(h, s, l) {
      s /= 100;
      l /= 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
      const m = l - c / 2;
      let [r, g, b] =
        h < 60
          ? [c, x, 0]
          : h < 120
          ? [x, c, 0]
          : h < 180
          ? [0, c, x]
          : h < 240
          ? [0, x, c]
          : h < 300
          ? [x, 0, c]
          : [c, 0, x];
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`;
    },

    generateFromColor(color) {
      // Convert to HSL and create variations
      const baseColor = this.hexToHSL(this.toHex(color));
      const [h, s, l] = baseColor;
      return [
        this.hslToHex(h, s, l),
        this.hslToHex((h + 30) % 360, s, l),
        this.hslToHex(h, s, Math.min(100, l + 15)),
        this.hslToHex((h + 180) % 360, s, l),
        this.hslToHex(h, s, Math.max(0, l - 15))
      ];
    },

    getContrast(bgColor) {
      const color = bgColor.replace("#", "");
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      // YIQ formula to determine brightness
      const yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "#000" : "#fff"; // dark text if bright bg, light text if dark bg
    },

    copyColor(color) {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color}!`);
    },

    toHex(color) {
      // Convert named colors to hex using a canvas trick
      const ctx = document.createElement("canvas").getContext("2d");
      ctx.fillStyle = color;
      return ctx.fillStyle;
    },

    copyColor(color) {
      navigator.clipboard.writeText(color);
      alert(`Copied ${color}!`);
    },

    exportJSON() {
      const json = JSON.stringify(this.palette, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "palette.json";
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}).mount("#app");
