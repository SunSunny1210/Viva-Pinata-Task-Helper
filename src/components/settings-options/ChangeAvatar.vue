<script setup>
</script>

<template>
    <div class="pop-up">
        <div class="change-avatar">
            <h2>Change Avatar</h2>
            <form>
                <label for="title" class="upload-btn">Upload your avatar</label>
                <input type="file" id="upload" name="avatar_upload" accept="image/*" hidden/>
                <label for="upload">Select your file</label>
                <img class="preview" src="" />
                <button type="submit">Upload</button>
            </form>
            <div class="uploaded-avatars">
                <h3>Uploaded Avatars</h3>
                <p>These are your uploaded avatars. Choose one of your like for your profile. If you don't see one you like, you can upload one on the option above!</p>
                <div class="avatars">
                    <img />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pop-up {
    position: fixed;
    height: 60%;
    width: 80%;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;

    .change-avatar {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
    
        h3 {
            font-size: 1.5rem;
            font-weight: lighter;
            text-align: center;
            color: var(--dark-green);
        }
        
        
        h2 {
            margin: 0;
            height: 30%;
            min-height: 60px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
        }
    
        form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            
            label {
                font-size: 1.5rem;
                color: var(--dark-green);
                border-radius: 12px;
            }
            
            .upload-btn {
                margin-bottom: 1rem;
                padding: 0.5rem;
                height: 3rem;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: var(--main-green);
            }
    
            input {
                margin: 1rem;
                padding: 10px;
                height: 2rem;
                width: 80%;
                border: 3px dashed orange;
                border-radius: 5px;
            }
            
            img {
                margin-bottom: 1rem;
                border-radius: 12px;
            }
            
            ::placeholder {
                color: darkolivegreen;
            }
            
            button {
                margin-bottom: 2rem;
                height: 4rem;
                width: 80%;
                color: white;
                font-size: 1rem;
                background-color: var(--carmin);
                border: none;
                border-radius: 12px;
            }
        }

        .uploaded-avatars {
            p {
            margin: 1.5rem;
            padding: 10px;
            text-align: center;
            background-color: var(--white-yellow);
            border: 3px dashed var(--carmin);
            border-radius: 5px;
        }
        }
    }
}
</style>