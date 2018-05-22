AES(Advanced Encryption Standard)
===========================

## 개요
AES는 1990년대 말 NIST에서 DES를 대체할 목적으로 개최한 AES 선발대회에서 우승한 레인달 알고리즘이다.

알고리즘 개요

AES 암호화 라운드
AES는 각 라운드에서 대체(substitution)와 치환(permutation)을 이용해서 데이터 블록 전체를 병렬 처리한다.

입력으로 사용하는 키를 44개의 32비트 워드 배열 w[i]로 확장한다. 4개의 서로 다른 워드(128비트)를 각 라운드에서 라운드 키로 사용한다.

다음 네 가지 단계를 이용하는데, 한 번의 치환과 세 번의 대체이다.

- 바이트 대체(Substitute bytes): S-box[6]라는 표를 이용하여 바이트 단위(byte-to-byte) 형태로 블록을 교환한다.
- 행 이동(Shift rows) : 단순히 행과 행을 치환한다.
- 열 섞기(Mix columns) : 열에 속한 모든 바이트를 순환 행렬을 사용해 함수로 열에 있는 각 바이트를 대체하여 변화시킨다.
- 라운드 키 더하기(Add round key) : 확장된 키의 일부와 현재 블록을 비트별로 XOR한다.

암호와 복호를 위해서 라운드 키 더하기 단계에서 시작하고, 각 라운드에서는 4단계를 모두 포함하는 9라운드를 수행하고, 3단계로 구성된 10번째 라운드를 수행한다.

오직 라운드 키 더하기 단계에서만 키를 사용한다. 그래서 암호와 복호 과정의 시작과 끝은 항상 라운드 키 더하기 단계이다. 시작이나 끝에 수행되는 다른 단계는 키 없이 역방향 계산이 가능하기 때문에 보안을 강화시키는 데는 아무 역할도 하지 못한다.

라운드 키 더하기 단계는 그 자체가 강력하지 못대는 대신 다른 세 단계와 같이 작동하여 비트를 뒤섞는 역할을 한다. 하지만 각각은 키를 사용하지 않으므로 보안성을 제공하는 것은 아니다. 이 암호 단계를 살펴보면 블록에 XOR 암호화(라운드 키 더하기)를 하고, 그 다음 블록을 뒤섞고(다른 세 단계), 그 뒤에 다시 XOR 암호화를 하는 것으로 이를 번갈아서 적용하는 것을 볼 수 있다. 이 구조는 효과적이고 보안성을 매우 강화시킨다.

각 단계를 역으로 계산하기는 쉽다. 바이트 대체, 행이동, 열 섞기 단계는 복호 알고리즘에서 사용되는 역함수이다, 라운드 키 더하기 단계에서는 같은 라운드 키를 블록에 XOR 수행하여 역을 계산한다.
대부분 블록 암호가 그렇듯 복호 알고리즘에서는 확장 키를 순서를 뒤집어서 적용한다. 그러나 복호 알고리즘이 암호 알고리즘과 동일하지는 않다. 이것이 AES구조가 가지고 있는 특성이다.
4단계가 모두 역 계산이 가능하므로 복호화를 하면 평문을 얻을 수 있다는 것은 당연하다.

암호와 복호의 마지막 라운드는 오직 세 단계로만 구성된다. 이것이 AES구조가 가진 특성이고, 이 특성은 AES암호가 역으로 작동되기 위해 필요한 것이다.


### AES 구현 라이브러리를 보면 AES-256,128이 있던데 차이는 뭘까..?
- KeySpec생성 시, key길이를 256bit를 사용하느냐, 128bit를 사용하느냐의 차이
- Initial Vector는 AES256/128모두 16byte(=128bit)를 사용해야 함.

### AES도 여러가지 Mode가 있던데? 각 모드별 차이점이 뭐지?
#### ECB (Electronic Code Block) Mode
- 가장 단순한 모드로 블록단위로 순차적으로 암호화 하는 구조이다.
- 한개의 블록만 해독되면 나머지 블록도 해독이 되는 단점이 있다. (Brute-Force Arttack, Dictionary Attack)
- 암호문이 블록의 배수가 되기 때문에 복호화 후 평문을 알기 위해서 Padding을 해야한다.

```Python
from hashlib import md5
from base64 import b64decode
from base64 import b64encode
from Crypto.Cipher import AES


# Padding for the input string --not
# related to encryption itself.
BLOCK_SIZE = 16  # Bytes
pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * \
                chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
unpad = lambda s: s[:-ord(s[len(s) - 1:])]


class AESCipher:
    """
    Usage:
        c = AESCipher('password').encrypt('message')
        m = AESCipher('password').decrypt(c)
    Tested under Python 3 and PyCrypto 2.6.1.
    """

    def __init__(self, key):
        self.key = md5(key.encode('utf8')).hexdigest()

    def encrypt(self, raw):
        raw = pad(raw)
        cipher = AES.new(self.key, AES.MODE_ECB)
        return b64encode(cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = b64decode(enc)
        cipher = AES.new(self.key, AES.MODE_ECB)
        return unpad(cipher.decrypt(enc)).decode('utf8')


##
# MAIN
# Just a test.
msg = input('Message...: ')
pwd = input('Password..: ')

print('Ciphertext:', AESCipher(pwd).encrypt(msg))
```

#### CBC(Cipher Block Chaining) Mode
- 블록 암호화 운영 모드 중 보안 성이 제일 높은 암호화 방법으로 가장 많이 사용된다.
- 평문의 각 블록은 XOR연산을 통해 이전 암호문과 연산되고 첫번째 암호문에 대해서는 IV(Initial Vector)가 암호문 대신 사용된다. 이 때, IV는 제 2의 키가 될수 있다.
- 암호문이 블록의 배수가 되기 때문에 복호화 후 평문을 얻기 위해서 Padding을 해야만 한다.
- 암호화가 병렬처리가 아닌 순차적으로 수행되어야 한다.

```python
from hashlib import md5
from base64 import b64decode
from base64 import b64encode
from Crypto import Random
from Crypto.Cipher import AES


# Padding for the input string --not
# related to encryption itself.
BLOCK_SIZE = 16  # Bytes
pad = lambda s: s + (BLOCK_SIZE - len(s) % BLOCK_SIZE) * \
                chr(BLOCK_SIZE - len(s) % BLOCK_SIZE)
unpad = lambda s: s[:-ord(s[len(s) - 1:])]


class AESCipher:
    """
    Usage:
        c = AESCipher('password').encrypt('message')
        m = AESCipher('password').decrypt(c)
    Tested under Python 3 and PyCrypto 2.6.1.
    """

    def __init__(self, key):
        self.key = md5(key.encode('utf8')).hexdigest()

    def encrypt(self, raw):
        raw = pad(raw)
        iv = Random.new().read(AES.block_size)
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return b64encode(iv + cipher.encrypt(raw))

    def decrypt(self, enc):
        enc = b64decode(enc)
        iv = enc[:16]
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        return unpad(cipher.decrypt(enc[16:])).decode('utf8')


##
# MAIN
# Just a test.
msg = input('Message...: ')
pwd = input('Password..: ')

print('Ciphertext:', AESCipher(pwd).encrypt(msg))
```


#### CFB(Cipher FeedBack) Mode
- 블록 암호화를 스트림 암호화처럼 구성해 평문과 암호문의 길이가 같다(패딩이 필요 없다)
- 최초의 키생성 버퍼로 IV가 사용되며, 이때 IV는 제2의 키가 될수 있다.
- 스트림의 기본단위를 Bit단위로 설정할 수 있으며, Bit단위에 따라 CFB8~CFB128로 쓰인다.
- 암호화, 복호화 모두 암호화로만 처리할 수 있다.
- CBC모드와 마찬가지로 암호화는 순차적이고, 복호화는 병렬적으로 처리할 수 있다.

#### OFB(Output FeedBack) Mode
- 블록 암호화를 스트림 암호화처럼 구성해 평문과 암호문의 길이가 같다.(패딩이 필요없다)
- 암호화 함수는 키 생성에만 사용되며, 암호화 방법과 복호화 방법이 동일해 암호문을 한번 더 암호화하면 평문이 나온다. (복호화시에 암호화)
- 최초의 키생성 버퍼로 IV가 사용되며, 이 때 IV는 제2의 키가 될수 있다.
- 스트림의 기본 단위를 Bit단위로 설정할 수 있으며, Bit단위에 따라 OFB8~OFB128로 쓰인다.

#### CTR (CounTeR) Mode
- 블록을 암호화할 때마다 1씩 증가해 가는 카운터를 암호화 해서 키스트림을 만든다. 즉 카운터를 암호화한 비트열과 평문블록과의 XOR를 취한 결과가 암호문 블록이 된다.
- CTR모드는 OFB와 같은 스트림 암호의 일종이다.
- CTR모드의 암복호화는 완전히 같은 구조가 되므로 구현이 간단하다.(OFB와 같은 스트림 암호의 특징)
- CTR모드에서는 블록의 순서를 임의로 암/복호화 할 수있다.(비표와 블록번호로부터 카운터를 구할 수 있기때문에)
- 블록을 임의의 순서로 처리 할 수 있다는 것은 처리를 병행 할 수 있다는 것을 의미한다.(병렬처리 가능)
