type Member = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  address: string;
  gender: string;
  joinDate: string;
  renewalDate: string;
};

class MemberService {
  create(data: Member) {
    return fetch('http://localhost:8080/members', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

export default new MemberService();
