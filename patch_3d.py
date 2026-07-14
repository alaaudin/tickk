import re

with open("src/index.css", "r") as f:
    content = f.read()

css_3d = """
@keyframes premium3DLoop {
  0% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02); }
  25% { transform: perspective(1000px) rotateX(2deg) rotateY(2deg) scale(1.03); }
  50% { transform: perspective(1000px) rotateX(0deg) rotateY(4deg) scale(1.02); }
  75% { transform: perspective(1000px) rotateX(-2deg) rotateY(2deg) scale(1.03); }
  100% { transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.02); }
}
.hover-3d-loop:hover {
  animation: premium3DLoop 3s infinite ease-in-out;
  box-shadow: 0 20px 40px -10px rgba(0,0,0,0.3);
}
.dark .hover-3d-loop:hover {
  box-shadow: 0 20px 40px -10px rgba(255,255,255,0.05);
}
"""
if "premium3DLoop" not in content:
    content += "\n" + css_3d
    with open("src/index.css", "w") as f:
        f.write(content)
