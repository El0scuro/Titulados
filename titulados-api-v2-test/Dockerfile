# ---------- Build stage ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Instalar pnpm
    RUN npm install -g pnpm@8
    
    # Copiar dependencias
    COPY package.json pnpm-lock.yaml ./
    
    # Instalar dependencias
    RUN pnpm install
    
    # Copiar proyecto
    COPY . .
    
    # Asegurar permisos de binarios
    RUN chmod -R +x node_modules/.bin
    
    # Compilar NestJS
    RUN pnpm build
    
    
    # ---------- Production stage ----------
    FROM node:20-alpine AS production
    
    WORKDIR /app
    
    # Instalar pnpm
    RUN npm install -g pnpm@8
    
    # Copiar dependencias
    COPY package.json pnpm-lock.yaml ./
    
    # Instalar solo dependencias de producción
    RUN pnpm install --prod
    
    # Copiar build desde builder
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/src/archivos ./src/archivos
    
    EXPOSE 4300
    
    CMD ["node", "dist/main.js"]