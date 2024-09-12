#!/bin/bash

# Création des dossiers
mkdir -p src/auth/guards
mkdir -p src/auth/strategies
mkdir -p src/users/dto
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

touch src/users/users.module.ts
touch src/users/users.service.ts
touch src/users/users.controller.ts
touch src/users/users.entity.ts
touch src/users/dto/create-user.dto.ts
touch src/users/dto/update-user.dto.ts
touch src/users/dto/login-user.dto.ts

touch src/common/decorators/roles.decorator.ts
touch src/common/interfaces/role.interface.ts
