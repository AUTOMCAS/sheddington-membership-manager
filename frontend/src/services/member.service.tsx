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

  getAll() {
    return fetch('http://localhost:8080/members', {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}

export default new MemberService();
