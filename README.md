📦 Rent Kro – Trust-Based Rental Platform
Rent Kro is a peer-to-peer rental platform that makes item renting simple, affordable, and secure using a dynamic trust factor system. Whether it's books, tools, gadgets, or other items, users can rent and lend safely without the hassle of huge security deposits or trust concerns.

🚀 Features
🔐 Trust Factor System: Each user has a trust score (0–10) that influences deposit amount and renting eligibility.

💸 Dynamic Security Deposit: Deposits are automatically calculated based on item value and the user's trust factor.

🔍 KYC & Verification: Secure sign-up with optional KYC to boost trust factor.

⭐ Ratings & Reviews: Owners and renters rate each other after transactions.

🛠️ Admin Controls: Built-in penalty, ban, and trust score adjustment system.

📱 Modern UI: Built with Angular for a fast, responsive frontend.

🌐 API-First Backend: Node.js + Express with MongoDB for scalable operations.

🧠 How Trust Factor Works
def calculate_security_deposit(product_value, trust_factor):
    base_deposit = 0.05 * product_value
    if trust_factor < 5:
        concession = 0.0
    elif 5 <= trust_factor < 6:
        concession = 0.001
    elif 6 <= trust_factor < 7:
        concession = 0.002
    elif 7 <= trust_factor < 8:
        concession = 0.005
    elif 8 <= trust_factor < 9:
        concession = 0.01
    elif trust_factor >= 9:
        concession = 0.02
    return base_deposit * (1 - concession)
🛠 Tech Stack
Frontend: HTML & CSS & HBS

Backend: Node.js + Express

Database: MongoDB

Authentication & Realtime: Firebase (optional)

📈 Future Plans
📲 Mobile app (Flutter/React Native)

🤖 ML-based trust prediction

🔗 Integration with payment & logistics APIs

🔒 Insurance for items

🧑‍💻 Team
Made with 💙 by developers passionate about simplifying rentals and building trust in peer-to-peer commerce.
![mainsr](https://github.com/user-attachments/assets/ddb07919-3064-49b8-8494-747453a87b12)
![signupr](https://github.com/user-attachments/assets/2d3152a6-b60c-4ebf-a4fc-e380b750f537)
![itemsr](https://github.com/user-attachments/assets/2608eb4b-3dbd-49fb-b7b8-593af88a8972)
![depr](https://github.com/user-attachments/assets/284c73ff-e09d-4947-9840-ac333fbea565)
![loginr](https://github.com/user-attachments/assets/aca9b300-5c8e-4c5e-bf30-3350442cf266)
![footer](https://github.com/user-attachments/assets/6bea9fc3-fbd1-4762-a001-326167b8b1d8)



