FROM node:21

RUN apt-get update && \
apt-get install -y \
ffmpeg \
imagemagick \
webp && \
apt-get upgrade -y && \
rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

# Install dependensi Node.js
RUN npm install --prefer-offline --no-audit --progress=false

# Copy semua file proyek ke dalam container
COPY . .

# Expose port 3000
EXPOSE 5100

# Command untuk menjalankan aplikasi
CMD ["node", "index.js"]