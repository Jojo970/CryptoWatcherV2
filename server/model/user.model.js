const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema(
    {
        username: {
        type: String,
        required: [true, 'username is required'],
        },
        email: {
        type: String,
        required: [true, 'email is required'],
        },
        password: {
        type: String,
        required: [true, 'password is required'],
        },
    },
    { timestamps: true },
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value));

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match');
    }
    next();
});

UserSchema.pre('save', async function (next) {
    console.log('IN PRE SAVE:', this.password);
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('HASHED:', hashedPassword);
        this.password = hashedPassword;
        next();
    } catch (error) {
        console.log('ERROR IN SAVE', error);
    }
});

module.exports = mongoose.model('User', UserSchema);