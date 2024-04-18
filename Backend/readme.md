# Keller Store

### ERD:

![ERD](erdKellerStore.png)

### Folder/File Structure:

```
    logs/
    src/
        configs/
            dbConnection.js
            swagger.json
        controllers/
            auth.js
            token.js
            user.js
        helpers/
            dateToLocaleString.js
            passwordEncrypt.js
            sendMail.js
            sync.js
        middlewares/
            authentication.js
            errorHandler.js
            findSearchSortPage.js
            logger.js
            permissions.js
            upload.js
        models/
            ad/
                ad.js
                addressAd.js
            category/
                category.js
                subCategory.js
            staff/
                addressStaff.js
                staff.js
            user/
                addressUser.js
                user.js
            business.js
            follow.js
            message.js
            notification.js
            sellAndBuy.js
            token.js
        routes/
            auth.js
            document.js
            index.js
            token.js
            user.js
    .env
    .gitignore
    index.js
    package-lock.json
    package.json
    readme.md
    swaggerAutogen.js

```
