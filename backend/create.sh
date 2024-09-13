#!/bin/bash

# Création des dossiers
mkdir -p src/auth/guards
mkdir -p src/auth/strategies
mkdir -p src/user/dto
mkdir -p src/common/decorators
mkdir -p src/common/interfaces

# Création des fichiers
touch src/auth/auth.module.ts
touch src/auth/auth.service.ts
touch src/auth/auth.controller.ts
touch src/auth/guards/jwt-auth.guard.ts
touch src/auth/guards/oauth2.guard.ts
touch src/auth/strategies/jwt.strategy.ts
touch src/auth/strategies/google.strategy.ts
touch src/auth/strategies/facebook.strategy.ts

touch src/user/user.module.ts
touch src/user/user.service.ts
touch src/user/user.controller.ts
touch src/user/user.entity.ts
touch src/user/dto/create-user.dto.ts
touch src/user/dto/update-user.dto.ts
touch src/user/dto/login-user.dto.ts

touch src/common/decorators/roles.decorator.ts
touch src/common/interfaces/role.interface.ts
